require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const dns = require("dns");
const path = require("path");

const { dbConnect } = require("./config/database");
const websocket = require("./config/websocket");

const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/TradeadminRoute");
const betRoute = require("./routes/TradebetRoute");

const {
  createTrade,
  checkwhichUserIsWinner,
} = require("./controllers/tradebetController");

dns.setServers([
  "8.8.8.8",
  "1.1.1.1",
]);

const app = express();
const server = http.createServer(app);

// ==========================================================
// WEBSOCKET
// ==========================================================

websocket.init(server);

// ==========================================================
// CORS
// ==========================================================

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "http://localhost:4000",


  "https://lotterry.marinclub.site",
  "https://lotterry.trade.marinclub.site",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without Origin
      // such as server-to-server / Postman
      if (!origin) {
        return callback(null, true);
      }

      if (
        allowedOrigins.includes(origin)
      ) {
        return callback(null, true);
      }

      console.log(
        "CORS BLOCKED:",
        origin
      );

      return callback(
        new Error(
          "Not allowed by CORS"
        )
      );
    },

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "PATCH",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

// ==========================================================
// MIDDLEWARE
// IMPORTANT: cookieParser BEFORE ROUTES
// ==========================================================

app.use(cookieParser());

app.use(
  express.json({
    limit: "10mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  })
);

// ==========================================================
// DEBUG COOKIE
// ==========================================================

app.use((req, res, next) => {
  if (
    req.path !== "/api/health"
  ) {
    console.log(
      "REQUEST:",
      req.method,
      req.path
    );

    console.log(
      "COOKIES:",
      req.cookies || {}
    );
  }

  next();
});

// ==========================================================
// ROUTES
// ==========================================================

app.use(
  "/api",
  userRoute
);

app.use(
  "/api",
  adminRoute
);

app.use(
  "/api",
  betRoute
);

// ==========================================================
// HEALTH
// ==========================================================

app.get(
  "/api/health",
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "API is working",
      database: "MongoDB",
    });
  }
);

// ==========================================================
// FRONTEND
// ==========================================================

const userDistPath = path.join(
  __dirname,
  "../client/dist"
);

app.use(
  express.static(userDistPath)
);

app.get(
  "/{*path}",
  (req, res) => {
    res.sendFile(
      path.join(
        userDistPath,
        "index.html"
      )
    );
  }
);

// ==========================================================
// 30 SECOND TRADING TIMER
// ==========================================================

const ROUND_SECONDS = 30;

let lastCreateCycle = null;
let lastWinnerCycle = null;

const getTradingClock = () => {
  const nowMs = Date.now();

  const unixSeconds =
    Math.floor(
      nowMs / 1000
    );

  const cycleSecond =
    unixSeconds %
    ROUND_SECONDS;

  const countdown =
    ROUND_SECONDS -
    cycleSecond;

  return {
    minute:
      Math.floor(
        countdown / 60
      ),

    secondtime1:
      Math.floor(
        (countdown % 60) / 10
      ),

    secondtime2:
      countdown % 10,

    countdown,
    cycleSecond,
    timestamp: nowMs,

    nextRoundAt:
      nowMs +
      countdown * 1000,
  };
};

const broadcastTradingClock =
  () => {
    const clock =
      getTradingClock();

    websocket.broadcast({
      event:
        "timeUpdate_30",
      ...clock,
    });

    return clock;
  };

const timer =
  setInterval(
    async () => {
      try {
        const clock =
          broadcastTradingClock();

        // Create next trade
        if (
          clock.countdown === 5
        ) {
          const cycleId =
            Math.floor(
              clock.timestamp /
              1000 /
              ROUND_SECONDS
            );

          if (
            lastCreateCycle !==
            cycleId
          ) {
            lastCreateCycle =
              cycleId;

            try {
              await createTrade();

              console.log(
                "✅ Trade created"
              );

              websocket.broadcast({
                event:
                  "tradeCreated",
                countdown: 5,
                timestamp:
                  Date.now(),
              });
            } catch (error) {
              console.error(
                "❌ createTrade error:",
                error
              );
            }
          }
        }

        // Check winner
        if (
          clock.countdown === 4
        ) {
          const cycleId =
            Math.floor(
              clock.timestamp /
              1000 /
              ROUND_SECONDS
            );

          if (
            lastWinnerCycle !==
            cycleId
          ) {
            lastWinnerCycle =
              cycleId;

            try {
              await checkwhichUserIsWinner();

              console.log(
                "✅ Winner checking completed"
              );

              websocket.broadcast({
                event:
                  "winnerChecked",
                countdown: 4,
                timestamp:
                  Date.now(),
              });
            } catch (error) {
              console.error(
                "❌ checkwhichUserIsWinner error:",
                error
              );
            }
          }
        }
      } catch (error) {
        console.error(
          "❌ Trading timer error:",
          error
        );
      }
    },
    1000
  );

setTimeout(() => {
  broadcastTradingClock();
}, 100);

// ==========================================================
// CRON
// ==========================================================

try {
  require(
    "./controllers/cronJob"
  );

  console.log(
    "Cron jobs loaded successfully"
  );
} catch (error) {
  console.error(
    "Cron job loading error:",
    error
  );
}

// ==========================================================
// GRACEFUL SHUTDOWN
// ==========================================================

const shutdown = async (
  signal
) => {
  console.log(
    `${signal} received. Shutting down server...`
  );

  clearInterval(timer);

  try {
    websocket.close();

    server.close(() => {
      console.log(
        "HTTP server closed"
      );

      process.exit(0);
    });
  } catch (error) {
    console.error(
      "Shutdown error:",
      error
    );

    process.exit(0);
  }
};

process.on(
  "SIGINT",
  () => shutdown("SIGINT")
);

process.on(
  "SIGTERM",
  () => shutdown("SIGTERM")
);

// ==========================================================
// DATABASE + SERVER
// ==========================================================

const PORT =
  process.env.PORT || 4000;

const startServer =
  async () => {
    try {
      await dbConnect();

      console.log(
        "MongoDB connected successfully"
      );

      server.listen(
        PORT,
        () => {
          console.log(
            `Server running on port ${PORT}`
          );

          console.log(
            `API: http://localhost:${PORT}/api`
          );

          console.log(
            `Health: http://localhost:${PORT}/api/health`
          );
        }
      );
    } catch (error) {
      console.error(
        "MongoDB connection failed:",
        error
      );

      process.exit(1);
    }
  };

startServer();
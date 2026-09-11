
const getSocketUrl = () => {
  // ----------------------------------------------------------
  // Optional Vite override
  // ----------------------------------------------------------
  if (import.meta.env.VITE_WS_URL) {
    return import.meta.env.VITE_WS_URL;
  }

  const hostname = window.location.hostname;

  // ----------------------------------------------------------
  // Local development
  // ----------------------------------------------------------
  if (
    hostname === "localhost" ||
    hostname === "127.0.0.1"
  ) {
    return "ws://localhost:4000/ws";
  }

  // ----------------------------------------------------------
  // Production
  // Same hostname + /ws
  // ----------------------------------------------------------
  const protocol =
    window.location.protocol === "https:"
      ? "wss:"
      : "ws:";

  return `${protocol}//${window.location.host}/ws`;
};

// ============================================================
// STATE
// ============================================================

let socket = null;
let reconnectTimer = null;
let reconnectAttempt = 0;

let shouldReconnect = true;

const listeners = new Set();

// ============================================================
// NOTIFY ALL SUBSCRIBERS
// ============================================================

const notify = (data) => {
  listeners.forEach((listener) => {
    try {
      listener(data);
    } catch (error) {
      console.error(
        "❌ WebSocket listener error:",
        error
      );
    }
  });
};

// ============================================================
// RECONNECT
// ============================================================

const scheduleReconnect = () => {
  if (!shouldReconnect) {
    return;
  }

  if (reconnectTimer) {
    return;
  }

  const delay = Math.min(
    1000 * 2 ** reconnectAttempt,
    10000
  );

  reconnectAttempt += 1;

  console.log(
    `🔄 WebSocket reconnecting in ${delay}ms`
  );

  reconnectTimer = setTimeout(() => {
    reconnectTimer = null;

    connect();
  }, delay);
};

// ============================================================
// CONNECT
// ============================================================

const connect = () => {
  if (!shouldReconnect) {
    return;
  }

  // Already connected/connecting
  if (
    socket &&
    (
      socket.readyState === WebSocket.OPEN ||
      socket.readyState === WebSocket.CONNECTING
    )
  ) {
    return;
  }

  const url = getSocketUrl();

  console.log(
    "🔌 Connecting WebSocket:",
    url
  );

  try {
    socket = new WebSocket(url);
  } catch (error) {
    console.error(
      "❌ WebSocket create error:",
      error
    );

    socket = null;
    scheduleReconnect();

    return;
  }

  // ==========================================================
  // OPEN
  // ==========================================================

  socket.onopen = () => {
    reconnectAttempt = 0;

    console.log(
      "✅ WebSocket connected:",
      url
    );

    notify({
      event: "socketStatus",
      status: "connected",
    });
  };

  // ==========================================================
  // MESSAGE
  // ==========================================================

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);

      notify(data);
    } catch (error) {
      console.error(
        "❌ Invalid WebSocket message:",
        event.data
      );
    }
  };

  // ==========================================================
  // ERROR
  // ==========================================================

  socket.onerror = (error) => {
    console.error(
      "❌ WebSocket error:",
      error
    );

    notify({
      event: "socketStatus",
      status: "error",
    });
  };

  // ==========================================================
  // CLOSE
  // ==========================================================

  socket.onclose = (event) => {
    console.log(
      `❌ WebSocket disconnected | code=${event.code} | reason=${
        event.reason || "none"
      }`
    );

    notify({
      event: "socketStatus",
      status: "disconnected",
      code: event.code,
      reason: event.reason || "",
    });

    socket = null;

    scheduleReconnect();
  };
};

// ============================================================
// SUBSCRIBE
// ============================================================

export const subscribeSocket = (listener) => {
  if (typeof listener !== "function") {
    console.error(
      "❌ subscribeSocket requires a function"
    );

    return () => {};
  }

  listeners.add(listener);

  shouldReconnect = true;

  connect();

  // Return unsubscribe function
  return () => {
    listeners.delete(listener);

    // IMPORTANT:
    // Do not close the shared socket here.
    // Another component may still be using it.
  };
};

// ============================================================
// SEND
// ============================================================

export const sendSocket = (payload) => {
  if (!socket) {
    console.warn(
      "⚠️ WebSocket is not initialized"
    );

    return false;
  }

  if (socket.readyState !== WebSocket.OPEN) {
    console.warn(
      "⚠️ WebSocket is not OPEN. State:",
      getSocketState()
    );

    return false;
  }

  try {
    socket.send(
      JSON.stringify(payload)
    );

    return true;
  } catch (error) {
    console.error(
      "❌ WebSocket send error:",
      error
    );

    return false;
  }
};

// ============================================================
// DISCONNECT
// ============================================================

export const disconnectSocket = () => {
  shouldReconnect = false;

  if (reconnectTimer) {
    clearTimeout(reconnectTimer);

    reconnectTimer = null;
  }

  if (socket) {
    try {
      socket.close(
        1000,
        "Client shutdown"
      );
    } catch (error) {
      console.error(
        "❌ WebSocket close error:",
        error
      );
    }

    socket = null;
  }

  listeners.clear();

  reconnectAttempt = 0;
};

// ============================================================
// STATE
// ============================================================

export const getSocketState = () => {
  if (!socket) {
    return "CLOSED";
  }

  switch (socket.readyState) {
    case WebSocket.CONNECTING:
      return "CONNECTING";

    case WebSocket.OPEN:
      return "OPEN";

    case WebSocket.CLOSING:
      return "CLOSING";

    case WebSocket.CLOSED:
      return "CLOSED";

    default:
      return "UNKNOWN";
  }
};

// ============================================================
// OPTIONAL: FORCE CONNECT
// ============================================================

export const connectSocket = () => {
  shouldReconnect = true;
  connect();
};

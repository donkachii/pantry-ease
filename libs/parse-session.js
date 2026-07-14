/**
 * Safely parse the session cookie value.
 * Returns null for missing, empty, or malformed values.
 */
export function parseSession(session) {
  if (!session) {
    return null;
  }

  try {
    const parsed = JSON.parse(session);
    if (parsed && typeof parsed === "object") {
      return parsed;
    }
    // Legacy plain UID string stored as JSON string, or non-object JSON
    if (typeof parsed === "string" && parsed) {
      return { uid: parsed, displayName: "", photoURL: "" };
    }
    return null;
  } catch {
    // Legacy plain UID cookie (not JSON)
    if (typeof session === "string" && session.trim()) {
      return { uid: session, displayName: "", photoURL: "" };
    }
    return null;
  }
}

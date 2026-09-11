export function assessSeverity(signals) {
  if (!signals || typeof signals !== "object") {
    throw new Error("Invalid signals provided for severity assessment");
  }

  let score = 0;

  // Impact force
  if (signals.impactForce >= 80) {
    score += 30;
  } else if (signals.impactForce >= 50) {
    score += 15;
  }

  // Sudden deceleration
  if (signals.suddenDeceleration >= 80) {
    score += 25;
  } else if (signals.suddenDeceleration >= 50) {
    score += 15;
  }

  // Sudden stop
  if (signals.suddenStop) {
    score += 10;
  }

  // Orientation change
  if (signals.orientationChange >= 80) {
    score += 25;
  } else if (signals.orientationChange >= 50) {
    score += 15;
  }

  // Airbag
  if (signals.airbagTriggered) {
    score += 20;
  }

  let severity;
  let reason;

  if (score >= 75) {
    severity = "CRITICAL";
    reason = "Multiple high-impact crash signals detected.";
  } else if (score >= 45) {
    severity = "MODERATE";
    reason = "Several accident signals require attention.";
  } else {
    severity = "MINOR";
    reason = "Low-impact signals detected.";
  }

  return {
    severity,
    score,
    reason
  };
}

export function assessSeverity(signals) {
  let score = 0;

  if (signals.impactForce >= 80) {
    score += 30;
  } else if (signals.impactForce >= 50) {
    score += 15;
  }

  if (signals.suddenDeceleration >= 80) {
    score += 25;
  } else if (signals.suddenDeceleration >= 50) {
    score += 15;
  }

  if (signals.orientationChange >= 80) {
    score += 25;
  } else if (signals.orientationChange >= 50) {
    score += 15;
  }

  if (signals.airbagTriggered) {
    score += 20;
  }

  if (score >= 75) {
    return {
      severity: "Critical",
      confidence: 94,
      reason: "Multiple high-impact crash signals detected."
    };
  }

  if (score >= 45) {
    return {
      severity: "Moderate",
      confidence: 82,
      reason: "Several accident signals require attention."
    };
  }

  return {
    severity: "Minor",
    confidence: 70,
    reason: "Low-impact signals detected."
  };
}
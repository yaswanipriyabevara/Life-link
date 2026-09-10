export function detectAccident(signals) {
  const detectedSignals = [];

  if (signals.impactForce >= 70) {
    detectedSignals.push("Impact Force");
  }

  if (signals.suddenDeceleration >= 70) {
    detectedSignals.push("Sudden Deceleration");
  }

  if (signals.orientationChange >= 70) {
    detectedSignals.push("Orientation Change");
  }

  if (signals.airbagTriggered) {
    detectedSignals.push("Airbag Trigger");
  }

  const accidentDetected = detectedSignals.length >= 2;

  return {
    accidentDetected,
    detectedSignals,
    signalCount: detectedSignals.length
  };
}
const SIGNAL_THRESHOLDS = {
  impactForce: 70,
  suddenDeceleration: 70,
  orientationChange: 70
};

export function validateSignals(signals) {
  if (!signals || typeof signals !== "object") {
    throw new Error("Invalid sensor signals");
  }

  return {
    impactForce: Number(signals.impactForce) || 0,
    suddenDeceleration: Number(signals.suddenDeceleration) || 0,
    suddenStop: Boolean(signals.suddenStop),
    orientationChange: Number(signals.orientationChange) || 0,
    airbagTriggered: Boolean(signals.airbagTriggered)
  };
}

export function detectAccident(sensorSignals) {
  const signals = validateSignals(sensorSignals);

  const detectedSignals = [];

  if (signals.impactForce >= SIGNAL_THRESHOLDS.impactForce) {
    detectedSignals.push("Impact Force");
  }

  if (
    signals.suddenDeceleration >=
    SIGNAL_THRESHOLDS.suddenDeceleration
  ) {
    detectedSignals.push("Sudden Deceleration");
  }

  if (signals.suddenStop) {
    detectedSignals.push("Sudden Stop");
  }

  if (
    signals.orientationChange >=
    SIGNAL_THRESHOLDS.orientationChange
  ) {
    detectedSignals.push("Orientation Change");
  }

  if (signals.airbagTriggered) {
    detectedSignals.push("Airbag Trigger");
  }

  const signalCount = detectedSignals.length;

  const accidentDetected = signalCount >= 2;

  /*
   * Rule-based confidence score.
   * Each confirmed signal contributes to the confidence.
   */
  const signalWeights = {
    "Impact Force": 25,
    "Sudden Deceleration": 25,
    "Sudden Stop": 15,
    "Orientation Change": 15,
    "Airbag Trigger": 20
  };

  const confidence = Math.min(
    detectedSignals.reduce(
      (total, signal) => total + signalWeights[signal],
      0
    ),
    100
  );

  return {
    detected: accidentDetected,
    confidence,
    signalsConfirmed: signalCount,
    detectedSignals,
    signals
  };
}

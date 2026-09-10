import {
  AlertTriangle,
  Activity,
  Gauge,
  ShieldCheck,
  MapPin,
  Radio
} from "lucide-react";

import Card from "../components/Card";
import StatusBadge from "../components/StatusBadge";

import { detectAccident } from "../logic/crashDetection";
import { assessSeverity } from "../logic/severityEngine";

import incidents from "../data/incidents.json";

import { useState } from "react";

function Incident() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSimulateAccident = async () => {
    if (loading) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      // Simulated sensor data
      const simulatedSignals = {
        ...incidents[0],
        suddenStop: true
      };

      // Crash detection
      const detection = detectAccident(simulatedSignals);

      // Severity assessment
      const severity = assessSeverity(simulatedSignals);

      setResult({
        detected: detection.detected,
        confidence: detection.confidence,
        signalsConfirmed: detection.signalsConfirmed,
        severity: severity.severity
      });
    } catch (err) {
  console.error("ACCIDENT SIMULATION ERROR:", err);
  setError(err.message || "Unable to simulate accident. Please try again.");
} finally {
      setLoading(false);
    }
  };

  const currentSeverity = result?.severity || "CRITICAL";

  return (
    <div className="dashboard-page">

      {/* Header */}

      <div className="dashboard-header">

        <div>
          <p className="dashboard-label">
            INCIDENT ANALYSIS
          </p>

          <h1>
            Accident Incident
          </h1>

          <p>
            Review the received incident signals and
            severity assessment.
          </p>
        </div>

        <StatusBadge
          status={currentSeverity}
          type="danger"
        />

      </div>


      {/* Simulate Accident */}

      <Card title="Crash Detection Simulation">

        <button
          onClick={handleSimulateAccident}
          disabled={loading}
        >
          {loading ? "Detecting Accident..." : "Simulate Accident"}
        </button>

        {error && (
          <p role="alert">
            {error}
          </p>
        )}

      </Card>


      {/* Signal Source */}

      <Card title="Incident Signal Source">

        <div className="info-row">

          <Radio size={24} />

          <div>

            <strong>
              Signal Source: Simulated Vehicle + Phone Sensors
            </strong>

            <p>
              Demo signals representing data that could
              be received from authorized connected devices
              in a production system.
            </p>

          </div>

        </div>

        <StatusBadge
          status="Simulated"
          type="info"
        />

      </Card>


      {/* Accident Detection */}

      <div className="dashboard-grid">

        {/* Signal Validation */}

        <Card title="Signal Validation">

          <div className="info-row">

            <AlertTriangle size={24} />

            <div>

              <strong>
                {result?.detected
                  ? "Incident Signal Received"
                  : "Waiting for Simulation"}
              </strong>

              <p>
                {result?.detected
                  ? "Multiple signals have been received and validated by LIFELINK."
                  : "Press Simulate Accident to validate the sensor signals."}
              </p>

            </div>

          </div>

          <StatusBadge
            status={result?.detected ? "Validated" : "Waiting"}
            type={result?.detected ? "success" : "info"}
          />

        </Card>


        {/* Detection Signals */}

        <Card title="Received Signals">

          <div className="signal-list">

            {[
              "Impact Force",
              "Sudden Deceleration",
              "Sudden Stop",
              "Orientation Change",
              "Airbag Trigger"
            ].map((signal) => (

              <div className="signal-item" key={signal}>

                <span>
                  {signal}
                </span>

                <StatusBadge
                  status={result ? "Detected" : "Waiting"}
                  type={result ? "danger" : "info"}
                />

              </div>

            ))}

          </div>

        </Card>


        {/* Severity */}

        <Card title="Severity Assessment">

          <div className="severity-box">

            <Gauge size={42} />

            <div>

              <strong>
                {result?.severity || "WAITING"}
              </strong>

              <p>
                Confidence: {result?.confidence ?? "--"}%
              </p>

            </div>

          </div>

          <p className="assessment-text">

            {result
              ? "Multiple high-impact signals indicate that immediate emergency assistance may be required."
              : "Severity will be calculated after accident simulation."}

          </p>

        </Card>


        {/* Location */}

        <Card title="Incident Location">

          <div className="info-row">

            <MapPin size={24} />

            <div>

              <strong>
                Location: Simulated GPS
              </strong>

              <p>
                Latitude: 16.5062
              </p>

              <p>
                Longitude: 80.648
              </p>

            </div>

          </div>

          <StatusBadge
            status="Simulated"
            type="info"
          />

        </Card>


        {/* Incident Information */}

        <Card title="Incident Information">

          <div className="incident-details">

            <div>

              <span>
                Incident ID
              </span>

              <strong>
                LL-2026-001
              </strong>

            </div>


            <div>

              <span>
                Signal Count
              </span>

              <strong>
                {result
                  ? `${result.signalsConfirmed} / 5`
                  : "-- / 5"}
              </strong>

            </div>


            <div>

              <span>
                Signal Source
              </span>

              <strong>
                Simulated
              </strong>

            </div>


            <div>

              <span>
                Validation
              </span>

              <strong>

                <ShieldCheck size={16} />

                {result ? "Confirmed" : "Waiting"}

              </strong>

            </div>

          </div>

        </Card>


        {/* Data Status */}

        <Card title="Prototype Data Status">

          <div className="signal-list">

            <div className="signal-item">

              <span>
                Location
              </span>

              <StatusBadge
                status="Simulated GPS"
                type="info"
              />

            </div>


            <div className="signal-item">

              <span>
                Hospital Availability
              </span>

              <StatusBadge
                status="Mock Data"
                type="info"
              />

            </div>


            <div className="signal-item">

              <span>
                Emergency Dispatch
              </span>

              <StatusBadge
                status="Simulation"
                type="info"
              />

            </div>


            <div className="signal-item">

              <span>
                Response Tracking
              </span>

              <StatusBadge
                status="Simulation"
                type="info"
              />

            </div>

          </div>

        </Card>

      </div>


      {/* Architecture Note */}

      <Card title="LIFELINK Signal Architecture">

        <div className="info-row">

          <Activity size={24} />

          <div>

            <strong>
              LIFELINK detects the incident, not simply vehicle damage.
            </strong>

            <p>
              In production, incident signals could be received
              from authorized smartphones, vehicle or OEM systems,
              or future connected devices.
            </p>

            <p>
              If no powered or connected signal source is available,
              software alone cannot detect an accident.
            </p>

          </div>

        </div>

      </Card>

    </div>
  );
}

export default Incident;
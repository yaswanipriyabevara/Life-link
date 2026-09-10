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

function Incident() {
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
          status="Critical"
          type="danger"
        />

      </div>


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

        <Card title="Signal Validation">

          <div className="info-row">

            <AlertTriangle size={24} />

            <div>

              <strong>
                Incident Signal Received
              </strong>

              <p>
                Multiple signals have been received
                and validated by LIFELINK.
              </p>

            </div>

          </div>

          <StatusBadge
            status="Validated"
            type="success"
          />

        </Card>


        {/* Detection Signals */}

        <Card title="Received Signals">

          <div className="signal-list">

            <div className="signal-item">

              <span>
                Impact Force
              </span>

              <StatusBadge
                status="Detected"
                type="danger"
              />

            </div>


            <div className="signal-item">

              <span>
                Sudden Deceleration
              </span>

              <StatusBadge
                status="Detected"
                type="danger"
              />

            </div>


            <div className="signal-item">

              <span>
                Orientation Change
              </span>

              <StatusBadge
                status="Detected"
                type="danger"
              />

            </div>


            <div className="signal-item">

              <span>
                Airbag Trigger
              </span>

              <StatusBadge
                status="Detected"
                type="danger"
              />

            </div>

          </div>

        </Card>


        {/* Severity */}

        <Card title="Severity Assessment">

          <div className="severity-box">

            <Gauge size={42} />

            <div>

              <strong>
                CRITICAL
              </strong>

              <p>
                Confidence: 94%
              </p>

            </div>

          </div>

          <p className="assessment-text">
            Multiple high-impact signals indicate
            that immediate emergency assistance
            may be required.
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
                4 / 4
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
                Confirmed
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
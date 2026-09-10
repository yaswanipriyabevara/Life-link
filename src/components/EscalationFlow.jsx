import {
  ShieldCheck,
  Phone,
  Ambulance,
  CheckCircle,
  AlertTriangle,
  Clock
} from "lucide-react";

import StatusBadge from "./StatusBadge";

function EscalationFlow({
  escalation = null,
  steps = [],
  onSafe,
  onNoResponse
}) {
  // Victim confirmation stage
  if (!escalation) {
    return (
      <div className="escalation-flow">

        <div className="escalation-question">
          <div className="escalation-icon">
            <AlertTriangle size={22} />
          </div>

          <div className="escalation-content">
            <h3>Are you safe?</h3>

            <p>
              We detected an accident signal.
              Please confirm your safety.
            </p>

            <div className="escalation-actions">
              <button
                className="safe-button"
                onClick={onSafe}
              >
                <CheckCircle size={18} />
                I'm Safe
              </button>

              <button
                className="help-button"
                onClick={onNoResponse}
              >
                <AlertTriangle size={18} />
                No Response
              </button>
            </div>
          </div>
        </div>

      </div>
    );
  }

  // Escalation / cancellation result
  return (
    <div className="escalation-flow">

      {steps.map((step) => {

        const icons = {
          "Accident Detected": AlertTriangle,
          "Emergency Contact": Phone,
          "Verified Responder": ShieldCheck,
          "Emergency Dispatch": Ambulance
        };

        const Icon = icons[step.title] || Clock;

        return (
          <div
            className={`escalation-step ${step.status}`}
            key={step.id}
          >

            <div className="escalation-icon">
              <Icon size={22} />
            </div>

            <div className="escalation-content">

              <div className="escalation-header">

                <h3>{step.title}</h3>

                {step.status === "completed" && (
                  <StatusBadge
                    status="Completed"
                    type="success"
                  />
                )}

                {step.status === "active" && (
                  <StatusBadge
                    status="Active"
                    type="info"
                  />
                )}

                {step.status === "pending" && (
                  <StatusBadge
                    status="Pending"
                    type="default"
                  />
                )}

              </div>

              <p>{step.description}</p>

              {step.status === "completed" && (
                <CheckCircle size={18} />
              )}

            </div>

          </div>
        );
      })}

    </div>
  );
}

export default EscalationFlow;
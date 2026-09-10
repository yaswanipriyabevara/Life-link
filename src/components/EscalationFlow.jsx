import {
  User,
  Phone,
  ShieldCheck,
  Ambulance,
  CheckCircle,
  Clock
} from "lucide-react";

import StatusBadge from "./StatusBadge";

function EscalationFlow({ steps }) {
  const icons = {
    "Victim": User,
    "Emergency Contact": Phone,
    "Verified Responder": ShieldCheck,
    "Emergency Dispatch": Ambulance
  };

  return (
    <div className="escalation-flow">

      {steps.map((step) => {

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

                <h3>
                  {step.title}
                </h3>

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

              <p>
                {step.description}
              </p>

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
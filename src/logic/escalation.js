export function findNearestAvailableResponder(responders) {
  const availableResponders = responders.filter(
    (responder) => responder.status === "Available"
  );

  if (availableResponders.length === 0) {
    return null;
  }

  return [...availableResponders].sort(
    (a, b) => a.distance - b.distance
  )[0];
}

export function createEscalation(responders) {
  const responder = findNearestAvailableResponder(responders);

  return {
    status: "escalating",
    emergencyContact: {
      status: "notified",
      message: "Emergency contact has been notified."
    },
    responder,
    dispatch: {
      status: responder ? "dispatched" : "pending",
      message: responder
        ? "Emergency dispatch initiated."
        : "No verified responder is currently available."
    },
    assigned: Boolean(responder)
  };
}

export function cancelEscalation() {
  return {
    status: "cancelled",
    emergencyContact: {
      status: "notified",
      message: "No emergency escalation was required."
    },
    responder: null,
    dispatch: {
      status: "cancelled",
      message: "Emergency escalation cancelled by victim."
    },
    assigned: false
  };
}

export function getEscalationFlow(escalation) {
  return [
    {
      id: 1,
      title: "Accident Detected",
      description: "Accident signal has been validated.",
      status: "completed"
    },
    {
      id: 2,
      title: "Emergency Contact",
      description:
        escalation.emergencyContact.message,
      status:
        escalation.status === "cancelled"
          ? "pending"
          : "completed"
    },
    {
      id: 3,
      title: "Verified Responder",
      description: escalation.responder
        ? `${escalation.responder.name} is ${escalation.responder.distance} km away and available.`
        : "No verified responder is currently available.",
      status: escalation.assigned
        ? "completed"
        : "pending"
    },
    {
      id: 4,
      title: "Emergency Dispatch",
      description: escalation.dispatch.message,
      status:
        escalation.dispatch.status === "dispatched"
          ? "completed"
          : escalation.dispatch.status === "cancelled"
          ? "pending"
          : "active"
    }
  ];
}
export function findNearestAvailableResponder(responders) {
  const availableResponders = responders.filter(
    (responder) => responder.status === "Available"
  );

  if (availableResponders.length === 0) {
    return null;
  }

  availableResponders.sort(
    (a, b) => a.distance - b.distance
  );

  return availableResponders[0];
}

export function getEscalationFlow(responder) {
  return [
    {
      id: 1,
      title: "Victim",
      description:
        "Accident detected and victim response unavailable.",
      status: "completed"
    },
    {
      id: 2,
      title: "Emergency Contact",
      description:
        "Emergency contact notification initiated.",
      status: "completed"
    },
    {
      id: 3,
      title: "Verified Responder",
      description: responder
        ? `${responder.name} is ${responder.distance} km away and available.`
        : "No verified responder is currently available.",
      status: responder ? "active" : "pending"
    },
    {
      id: 4,
      title: "Emergency Dispatch",
      description:
        "Emergency dispatch escalation ready.",
      status: "pending"
    }
  ];
}
function HospitalCard({ hospital, recommended = false }) {
  if (!hospital) return null;

  return (
    <div className="hospital-card">
      {recommended && (
        <span className="recommended-badge">
          Recommended
        </span>
      )}

      <h3>{hospital.name}</h3>

      <p>
        📍 {hospital.distance} km away
      </p>

      <p>
        Trauma Level:{" "}
        <strong>{hospital.traumaLevel}</strong>
      </p>

      <p>
        Availability:{" "}
        <strong>
          {hospital.availability
            ? "Available"
            : "Unavailable"}
        </strong>
      </p>

      {hospital.specialties?.length > 0 && (
        <p>
          Specialties:{" "}
          {hospital.specialties.join(", ")}
        </p>
      )}

      {hospital.score !== undefined && (
        <p>
          Match Score:{" "}
          <strong>{hospital.score}</strong>
        </p>
      )}

      {hospital.reasons?.length > 0 && (
        <div className="hospital-reasons">
          <strong>Why recommended?</strong>

          <ul>
            {hospital.reasons.map((reason, index) => (
              <li key={index}>✓ {reason}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default HospitalCard;
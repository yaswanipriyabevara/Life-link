function Timeline({ events = [] }) {
  return (
    <div className="timeline">
      {events.map((event, index) => (
        <div className="timeline-item" key={index}>
          <div className="timeline-dot"></div>

          <div className="timeline-content">
            <h3>{event.title}</h3>

            <p>{event.description}</p>

            {event.time && (
              <span className="timeline-time">{event.time}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Timeline;
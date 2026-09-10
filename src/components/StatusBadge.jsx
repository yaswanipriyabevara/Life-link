function StatusBadge({ status, type = "default" }) {
  return (
    <span className={`status-badge status-${type}`}>
      {status}
    </span>
  );
}

export default StatusBadge;
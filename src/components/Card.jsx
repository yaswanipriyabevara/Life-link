function Card({ title, children, className = "" }) {
  return (
    <div className={`lifelink-card ${className}`}>
      {title && <h2 className="lifelink-card-title">{title}</h2>}
      <div className="lifelink-card-content">
        {children}
      </div>
    </div>
  );
}

export default Card;
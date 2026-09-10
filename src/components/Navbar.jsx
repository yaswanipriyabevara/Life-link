import { Link } from "react-router-dom";
import { HeartPulse, LayoutDashboard, Activity, MapPin } from "lucide-react";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <HeartPulse size={28} />
        <span>LIFELINK</span>
      </Link>

      <div className="navbar-links">
        <Link to="/" className="nav-link">
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        <Link to="/incident" className="nav-link">
          <Activity size={18} />
          Incident
        </Link>

        <Link to="/tracking" className="nav-link">
          <MapPin size={18} />
          Tracking
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
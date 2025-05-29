// src/components/Menu.tsx
import { Link } from "react-router-dom";
import "./Menu.css";

function Menu() {
  return (
    <nav className="menu">
      <Link to="/">Avaleht</Link>
      <Link to="/add">Lisa sõna</Link>
      <Link to="/manage">Halda sõnu</Link>
      <Link to="/haldajad">Haldajad</Link>
      <Link to="/add-haldaja">Lisa haldaja</Link>

    </nav>
  );
}

export default Menu;

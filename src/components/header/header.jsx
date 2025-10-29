import "./header.scss";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <div className="header">
      <NavLink to="/" end>
        <p>Przydział pojazdów</p>
      </NavLink>
      <NavLink to="/map">
        <p>Mapa</p>
      </NavLink>
      <NavLink to="/upcomingServices">
        <p>Nadchodzące serwisy</p>
      </NavLink>
      <NavLink to="/upcomingChanges">
        <p>Zbliżające się zmiany</p>
      </NavLink>
      <NavLink to="/raports">
        <p>Raporty</p>
      </NavLink>
      <NavLink to="/history">
        <p>Historia</p>
      </NavLink>
      <NavLink to="/notifications">
        <p>Powiadomienia</p>
      </NavLink>
    </div>
  );
}

import "./header.scss";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="header">
      <Link to="/">
        <p>Przydział pojazdów</p>
      </Link>
      <Link to="/map">
        <p>Mapa</p>
      </Link>
      <Link to="/upcomingService">
        <p>Nadchodzące serwisy</p>
      </Link>
      <Link to="/upcomingChanges">
        <p>Zbliżające się zmiany</p>
      </Link>
      <Link to="/raports">
        <p>Raporty</p>
      </Link>
      <Link to="/history">
        <p>Historia</p>
      </Link>
      <Link to="/notifications">
        <p>Powiadomienia</p>
      </Link>
    </div>
  );
}

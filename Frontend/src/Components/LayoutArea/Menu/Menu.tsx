import { NavLink } from "react-router-dom";
import TotalVacations from "../../VacationsArea/TotalVacations/TotalVacations";
import "./Menu.css";

function Menu(): JSX.Element {

  return (
    <div className="Menu">
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/vacations/">Vacation deals</NavLink>
      <NavLink to="/about">About us</NavLink>
      <TotalVacations />
    </div>
  );
}

export default Menu;

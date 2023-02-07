import { NavLink, useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import TotalVacations from "../../VacationsArea/TotalVacations/TotalVacations";
import "./Menu.css";

function Menu(): JSX.Element {

  return (
    <div className="Menu">
      <AuthMenu />
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/vacations/">Vacations</NavLink>
      <NavLink to="/about">About</NavLink>

      <TotalVacations />
    </div>
  );
}

export default Menu;

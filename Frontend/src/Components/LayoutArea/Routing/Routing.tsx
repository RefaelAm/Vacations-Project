import { Navigate, Route, Routes } from "react-router-dom";
import About from "../../AboutArea/About/About";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import Register from "../../AuthArea/Register/Register";
import Graph from "../../GraphArea/Graph/Graph";
import Home from "../../HomeArea/Home/Home";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import EditVacation from "../../VacationsArea/EditVacation/EditVacation";
import VacationDetails from "../../VacationsArea/VacationDetails/VacationDetails";
import VacationList from "../../VacationsArea/VacationList/VacationList";
import PageNotFound from "../PageNotFound/PageNotFound";
import "./Routing.css";

function Routing(): JSX.Element {

  return (
    <div className="Routing">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/home" element={<Home />} />
        <Route path="/vacations" element={<VacationList />} />
        <Route
          path="/vacations/details/:vacationId"
          element={<VacationDetails />}
        />
        <Route path="/vacations/new" element={<AddVacation />} />
        <Route path="/vacations/edit/:vacationId" element={<EditVacation />} />
        <Route path="/about" element={<About />} />
        <Route path="/Graph" element={<Graph />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default Routing;

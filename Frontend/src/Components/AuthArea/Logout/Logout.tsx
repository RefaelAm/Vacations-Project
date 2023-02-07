import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { VacationsActionType, vacationsStore } from "../../../Redux/VacationsState";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Logout.css";

function Logout(): JSX.Element {

    const navigate = useNavigate();

    useEffect(() => {
        
        vacationsStore.dispatch({ type: VacationsActionType.EmptyStore, payload: [] });

        authService.logout();

        notifyService.success("Bye Bye");

        navigate("/login");

    }, []);

    return null;
}

export default Logout;

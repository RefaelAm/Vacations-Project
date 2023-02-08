import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import { VacationsActionType, vacationsStore } from "../../../Redux/VacationsState";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import appConfig from "../../../Utils/Config";
import "./VacationDetails.css";

function VacationDetails(): JSX.Element {
    const params = useParams();
    const [vacation, setVacation] = useState<VacationModel>();
    const [role, setRole] = useState<boolean>();
    const navigate = useNavigate();

    useEffect(() => {
        const id = +params.vacationId; 
        vacationsService.getOneVacation(id)
            .then(vacation => setVacation(vacation))
            .catch(err => notifyService.error(err)); 
            authService.isAdmin()
            .then(role => setRole(role))
            .catch(err => notifyService.error(err));
    }, []);

    async function deleteVacation(id: number) {
        try {
            vacationsStore.dispatch({ type: VacationsActionType.EmptyStore, payload: [] });
            await vacationsService.deleteVacation(id);
            notifyService.success("Vacation has been deleted");
            navigate("/vacations");
        }
        catch(err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Vacation-details">
            {vacation &&
                <>
                <div className="Container">
                    <h1>{vacation.destination}</h1>
                    <h2>{vacation.description}</h2>
                    <h3>Dates: {vacation.startDate + " until " + vacation.endDate}</h3>
                    <h3>Price: {vacation.price}$ </h3>
                </div> 
                    <img src={appConfig.vacationImagesUrl + vacation.imageName} />              
                </>
            }
            <br />
            <br />
            <NavLink to="/vacations">Back</NavLink>
            {role && <>
                <NavLink  to={"/vacations/edit/" + vacation?.vacationId}>Edit</NavLink>
                <NavLink to="/vacations" onClick={() => {deleteVacation(vacation.vacationId)}}>Delete</NavLink>
            </>
            }
        </div>
    );
}

export default VacationDetails;

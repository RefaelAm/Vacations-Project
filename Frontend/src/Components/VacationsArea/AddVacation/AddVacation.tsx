import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import "./AddVacation.css";

function AddVacation(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<VacationModel>();
    const navigate = useNavigate();
    const currentDate = new Date().toISOString().split("T")[0];

    async function areYouAnAdmin() {
        try {
            const admin = await authService.isAdmin();
            if (!admin) {
                notifyService.error("You must be logged in as admin");
                navigate("/vacations");
                return;
            }
            }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    useEffect(()=>{
        areYouAnAdmin()
    },[])

    async function send(vacation: VacationModel) {
        try {
            areYouAnAdmin();
            if (new Date(vacation.startDate) > new Date(vacation.endDate)) {
                notifyService.error("Start date must be before the end date")
                return;
            }
            await vacationsService.addVacation(vacation);
            notifyService.success("Vacation has been successfully added");
            navigate("/vacations");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="AddVacation Box">

            <form onSubmit={handleSubmit(send)}>

                <h2>Add Vacation</h2>

                <label>Destination: </label>
                <input type="text" {...register("destination", VacationModel.destinationValidation)} />
                <span className="Error">{formState.errors.destination?.message}</span>

                <label>Description: </label>
                <input type="text" {...register("description", VacationModel.descriptionValidation)} />
                <span className="Error">{formState.errors.description?.message}</span>

                <label>Start Date: </label>
                <input type="date" min={currentDate} {...register("startDate", VacationModel.startDateValidation)} />
                <span className="Error">{formState.errors.startDate?.message}</span>

                <label>End Date: </label>
                <input type="date" min={currentDate}{...register("endDate", VacationModel.endDateValidation)} />
                <span className="Error">{formState.errors.endDate?.message}</span>

                <label>Price: </label>
                <input type="number" {...register("price", VacationModel.priceValidation)} />
                <span className="Error">{formState.errors.price?.message}</span>

                <label>Image: </label>
                <input type="file" accept="image/*" {...register("image")} />
                <span className="Error">{formState.errors.image?.message}</span>

                <button>Add</button>

            </form>

        </div>
    );
}

export default AddVacation;

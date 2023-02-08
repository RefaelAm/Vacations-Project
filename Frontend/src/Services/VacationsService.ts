import axios from "axios";
import FollowerModel from "../Models/FollowerModel";
import VacationModel from "../Models/VacationModel";
import { VacationsActionType, vacationsStore } from "../Redux/VacationsState";
import appConfig from "../Utils/Config";
import authService from "./AuthService";

class VacationsService {

    public async getAllVacationsWithLikes(): Promise<VacationModel[]> {
        let vacations = vacationsStore.getState().vacations;
        const currentUserId: number = await authService.getUserIdFromToken()
        if (vacations.length === 0) {
            const response = await axios.get<VacationModel[]>(appConfig.likedVacationsUrl + currentUserId); // AJAX
            vacations = response.data;
            vacationsStore.dispatch({ type: VacationsActionType.FetchVacations, payload: vacations });
        }
        return vacations;
    }

    public async getOneVacation(vacationId: number): Promise<VacationModel> {
        const response = await axios.get<VacationModel>(appConfig.vacationsUrl + vacationId);
        const vacation = response.data;
        return vacation;
    }

    public async addVacation(vacation: VacationModel): Promise<void> {
        const myFormData = new FormData();
        myFormData.append("destination", vacation.destination);
        myFormData.append("description", vacation.description);
        myFormData.append("startDate", vacation.startDate);
        myFormData.append("endDate", vacation.endDate);
        myFormData.append("price", vacation.price.toString());
        myFormData.append("image", vacation.image[0]);
        myFormData.append("imageName", vacation.imageName);
        const response = await axios.post<VacationModel>(appConfig.vacationsUrl, myFormData);
        const addedVacation = response.data;
        vacationsStore.dispatch({ type: VacationsActionType.AddVacation, payload: addedVacation });
    }

    public async updateVacation(vacation: VacationModel): Promise<void> {
        const myFormData = new FormData();
        myFormData.append("destination", vacation.destination);
        myFormData.append("description", vacation.description);
        myFormData.append("startDate", vacation.startDate);
        myFormData.append("endDate", vacation.endDate);
        myFormData.append("price", vacation.price.toString());
        if (!vacation.image) myFormData.append("imageName", vacation.imageName);
        else {
            myFormData.append("image", vacation.image[0]);
            myFormData.append("imageName", vacation.imageName);
        }
        const response = await axios.put<VacationModel>(appConfig.vacationsUrl + vacation.vacationId, myFormData); // Sending object without files.
        const updatedVacation = response.data;
        vacationsStore.dispatch({ type: VacationsActionType.UpdateVacation, payload: updatedVacation });
    }

    public async deleteVacation(id: number): Promise<void> {
        await axios.delete<void>(appConfig.vacationsUrl + id);
        vacationsStore.dispatch({ type: VacationsActionType.DeleteVacation, payload: id });
    }

    public async addFollower(follower: FollowerModel): Promise<void> {
        const response = await axios.post<FollowerModel>(appConfig.likedVacationsUrl, follower);
        const addedFollower = response.data;
        vacationsStore.dispatch({ type: VacationsActionType.AddFollower, payload: follower.vacationId });
    }

    public async deleteFollower(follower: FollowerModel): Promise<void> {
        await axios.delete<void>(appConfig.likedVacationsUrl + follower.vacationId + "/" + follower.userId);
        vacationsStore.dispatch({ type: VacationsActionType.DeleteFollower, payload: follower.vacationId });
    }
}
const vacationsService = new VacationsService();

export default vacationsService;

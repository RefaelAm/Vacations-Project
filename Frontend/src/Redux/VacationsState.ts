import { createStore } from "redux";
import VacationModel from "../Models/VacationModel";


export class VacationsState {
    public vacations: VacationModel[] = [];
}

export enum VacationsActionType {
    FetchVacations = "FetchVacations",
    AddVacation = "AddVacation",
    UpdateVacation = "UpdateVacation",
    DeleteVacation = "DeleteVacation",
    EmptyStore = "EmptyStore",
    AddFollower = "AddFollower",
    DeleteFollower = "DeleteFollower"
}

export interface VacationsAction {
    type: VacationsActionType;
    payload: any;
}

export function vacationsReducer(currentState = new VacationsState(), action: VacationsAction): VacationsState {

    const newState = { ...currentState };

    switch (action.type) {

        case VacationsActionType.FetchVacations: 
            newState.vacations = action.payload;
            break;

        case VacationsActionType.AddVacation: 
            newState.vacations.push(action.payload);
            break;

        case VacationsActionType.UpdateVacation: 
            const indexToUpdate = newState.vacations.findIndex(v => v.vacationId === action.payload.id);
            if(indexToUpdate >= 0) {
                newState.vacations[indexToUpdate] = action.payload;
            }
            break;

        case VacationsActionType.DeleteVacation: 
            const indexToDelete = newState.vacations.findIndex(v => v.vacationId === action.payload);
            if(indexToDelete >= 0) {
                newState.vacations.splice(indexToDelete, 1);
            }
            break;
        case VacationsActionType.EmptyStore:
            newState.vacations=action.payload;
            break;
            
        case VacationsActionType.AddFollower:
            const addFollowerIndex = newState.vacations.findIndex(v => v.vacationId === action.payload);
            newState.vacations[addFollowerIndex].followersCount++;
            newState.vacations[addFollowerIndex].isFollowing=1;
            
            break;

        case VacationsActionType.DeleteFollower:
            const deleteFollowerIndex = newState.vacations.findIndex(v => v.vacationId === action.payload);
            newState.vacations[deleteFollowerIndex].followersCount--;
            newState.vacations[deleteFollowerIndex].isFollowing=0;
            break;

    }

    return newState;
}

export const vacationsStore = createStore(vacationsReducer); 

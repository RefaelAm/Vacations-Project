import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import Spinner from "../../SharedArea/Spinner/Spinner";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationList.css";
import GraphSymbol from "../../../Assets/Images/bar-graph.png"
import { vacationsStore } from "../../../Redux/VacationsState";
import yoda from "../../../Assets/Images/yoda.png"


interface IProps { }
interface IState {
    currentPage: number;
    data: any[];
    itemsPerPage: number;
    pageCount: number;
}

const VacationList: React.FC<IProps> = (props: IProps) => {
    const [state, setState] = useState<IState>({
        currentPage: 0,
        data: [],
        itemsPerPage: 6,
        pageCount: 0
    });
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [role, setRole] = useState<boolean>();
    const [checked, setChecked] = useState<boolean>(false);


    useEffect(() => {
        vacationsService.getAllVacationsWithLikes()
            .then(vacations => setVacations(vacations))
            .catch(err => notifyService.error(err))

        authService.isAdmin()
            .then(role => setRole(role))
            .catch(err => notifyService.error(err));

        authService.getUserIdFromToken()
            .then(logged => { if (logged != 0) setLoggedIn(true) })
            .catch(err => notifyService.error(err));

        const fetchData = async () => {
            const data = await vacationsService.getAllVacationsWithLikes();
            setState({ ...state, data, pageCount: Math.ceil(data.length / state.itemsPerPage) });
        }
        fetchData();
        const unsubscribe = vacationsStore.subscribe(() => {
            setVacations(vacationsStore.getState().vacations);

        });
        return () => unsubscribe();
    }, []);

    const handlePageClick = (pageNumber: number) => {
        if (checked) {
            const data = vacations.filter(v => v.isFollowing);
            setState({ ...state, currentPage: pageNumber, data, pageCount: Math.ceil(data.length / state.itemsPerPage) });
        }
        else {
            const data = vacations;
            setState({ ...state, currentPage: pageNumber, data, pageCount: Math.ceil(data.length / state.itemsPerPage) });
        }
    }
    let pageData = state.data.slice(state.currentPage * state.itemsPerPage, (state.currentPage + 1) * state.itemsPerPage);

    async function showVacations() {
        try {
            if (!checked) {
                setChecked(true);
                const data = vacations.filter(v => v.isFollowing);
                setState({ ...state, currentPage: 0, data, pageCount: Math.ceil(data.length / state.itemsPerPage) });
            }
            else {
                setChecked(false);
                const data = vacations;
                setState({ ...state, currentPage: 0, data, pageCount: Math.ceil(data.length / state.itemsPerPage) });
            }
        } catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Vacation-list">
            {state.data.length === 0 && !checked && <Spinner />}
            {state.data.length === 0 && checked && <>
                <div className="no-follows">
                    <img src={yoda}></img>
                    <span className="Yoda">Follow vacations, you do not Mmmmm?</span>
                </div>
            </>}
            {role && <>
                <NavLink className={"Add"} to="/vacations/new">+</NavLink>
                <NavLink to="/Graph"><img src={GraphSymbol} /></NavLink>
            </>
            }
            {!role && loggedIn && <>
                <div className="filter">
                    <label className="rocker rocker-small">
                        <input type="checkbox"
                            onChange={() => showVacations()}
                            checked={checked ? true : false}></input>
                        <span className="switch-left">✔️</span>
                        <span className="switch-right">All</span>
                    </label>
                </div>
            </>
            }
            {pageData.map(v => <VacationCard key={v.vacationId} vacation={v} />)}
            <div className="Pagination">
                {Array.from({ length: state.pageCount }, (_, i) => (
                    <button className="Pagination-options" key={i} onClick={() => handlePageClick(i)}>
                        {i + 1}
                    </button>
                ))}
                <span className="WhatPage">Page {state.currentPage + 1} out of {state.pageCount}</span>
            </div>
        </div>);
}

export default VacationList;

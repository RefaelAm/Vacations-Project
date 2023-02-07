import { useEffect, useState } from "react";
import { vacationsStore } from "../../../Redux/VacationsState";

import "./TotalVacations.css";

function TotalVacations(): JSX.Element {

    const [count, setCount] = useState<number>(0);

    useEffect(() => {

        setCount(vacationsStore.getState().vacations.length);
        const unsubscribe = vacationsStore.subscribe(() => {
            setCount(vacationsStore.getState().vacations.length);

        });

        return () => {

            // Unsubscribe: 
            unsubscribe();
        };

    }, []);

    if(count === 0) return null;

    return (
        <div className="TotalVacations Box font-link">
            <span>Total Vacations: {count}</span>
        </div>
    );
}

export default TotalVacations;

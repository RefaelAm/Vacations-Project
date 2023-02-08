import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import FollowersGraph from "../FollowersGraph/FollowersGraph";
import "./Graph.css";


function Graph(): JSX.Element {
    const navigate = useNavigate();

    async function areYouAnAdmin() {
        try {
            const admin = await authService.isAdmin();
            if (!admin) {
                notifyService.error("You must be logged in as admin");
                navigate("/home");
                return;
            }
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }
    useEffect(() => {
        areYouAnAdmin()
    }, [])

    return (<div className="Graph"><FollowersGraph /> </div>);
}

export default Graph;

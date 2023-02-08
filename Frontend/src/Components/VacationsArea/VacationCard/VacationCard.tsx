import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import FollowerModel from "../../../Models/FollowerModel";
import VacationModel from "../../../Models/VacationModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import appConfig from "../../../Utils/Config";
import "./VacationCard.css";

interface VacationCardProps {
  vacation: VacationModel;
}

function VacationCard(props: VacationCardProps): JSX.Element {
  const [followers, setFollowers] = useState(props.vacation.followersCount);
  const [isFollowing, setIsFollowing] = useState(props.vacation.isFollowing);
  const [userId, setUserId] = useState<number>();
  useEffect(() => {
    authService.getUserIdFromToken()
      .then(id => { setUserId(id) })
      .catch(err => notifyService.error(err));
  }, []);


  async function click() {
    try {
      const vacationId = props.vacation.vacationId;
      const userId = await authService.getUserIdFromToken();
      const follower = new FollowerModel();
      follower.vacationId = vacationId;
      follower.userId = userId;
      if (isFollowing) {
        setIsFollowing(0)
        setFollowers(followers - 1)
        vacationsService.deleteFollower(follower);
      } else {
        setIsFollowing(1)
        setFollowers(followers + 1)
        vacationsService.addFollower(follower);
      }
    } catch (err: any) {
      notifyService.error(err);
    }
  }

  return (
    <div className="Vacation-card Box ">
      <label className="container" >
        <input
          type="checkbox"
          disabled={userId === 1 || userId === 0 ? true : false}
          checked={isFollowing === 1 ? true : false}
          onChange={() => click()}
        />
        <div className="checkmark"></div>
      </label>
      <div className="Likes">{followers}</div>
      <div className="Container">
        <h2>{props.vacation.destination}</h2>
        <br />
        <span>{props.vacation.description}</span>
        <br />
      </div>
      <div>
        <NavLink to={"/vacations/details/" + props.vacation.vacationId}>
          <img src={appConfig.vacationImagesUrl + props.vacation.imageName} />
        </NavLink>
      </div>
    </div>
  );
}

export default VacationCard;

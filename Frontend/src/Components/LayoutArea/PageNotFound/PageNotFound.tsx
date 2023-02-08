import "./PageNotFound.css";
import pageNotFound from "../../../Assets/Images/404.jpg"

function PageNotFound(): JSX.Element {
    return (
        <div className="PageNotFound">   
            <img src={pageNotFound}/>
        </div>
    );
}

export default PageNotFound;

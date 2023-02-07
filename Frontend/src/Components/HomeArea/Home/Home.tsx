import "./Home.css";
import galaxy from "../../../Assets/Images/galaxyMap.webp"


function Home(): JSX.Element {

    return (
        <div className="Home">

            <span className="font-link Box"> Travel the galaxy with us!</span>

          <div className="imgContainer">
                <img src={galaxy}/>
          </div>

        </div>
    );
}

export default Home;

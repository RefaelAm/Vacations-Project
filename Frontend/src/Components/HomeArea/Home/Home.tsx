import "./Home.css";
import indigoHomePage from '../../../Assets/Images/indigoHomePage.jpg';

function Home(): JSX.Element {

    return (
        <div className="Home">

            <span className="Top-title">Indigo travels agency</span>

            <div className="img-container">
                <img src={indigoHomePage} />
            </div>

        </div>
    );
}

export default Home;

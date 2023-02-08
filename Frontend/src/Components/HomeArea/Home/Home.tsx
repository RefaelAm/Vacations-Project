import "./Home.css";
import indigoHomePage from '../../../Assets/Images/indigoHomePage.jpg';

function Home(): JSX.Element {

    return (
        <div className="Home">
            <div className="Top-title"><span className="Top-title-indigo">Indigo</span> travels agency</div>
            <div className="img-container">
                <img src={indigoHomePage} />
            </div>

        </div>
    );
}

export default Home;

import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <div className="Header">
            <div className="">
            <span>Indigo</span> Travels
            </div>
            <div className="Auth-menu">
                <AuthMenu />
            </div>
        </div>
    );
}

export default Header;


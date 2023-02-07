import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import { VacationsActionType, vacationsStore } from "../../../Redux/VacationsState";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Login.css";

function Login(): JSX.Element {

    const { register, handleSubmit, formState  } = useForm<CredentialsModel>();
    const navigate = useNavigate();

    async function send(credentials: CredentialsModel) {
        try {
            vacationsStore.dispatch({ type: VacationsActionType.EmptyStore, payload: [] });
            await authService.login(credentials);
            notifyService.success("Welcome Back!");
            navigate("/home");
        }
        catch(err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Login Box">

            <form onSubmit={handleSubmit(send)}>

                <h2>Login</h2>

                <label>Username: </label>
                <input type="text" {...register("username", CredentialsModel.usernameValidation)} />
                <span className="Error">{formState.errors.username?.message}</span>

                <label>Password: </label>
                <input type="password" {...register("password", CredentialsModel.passwordValidation)} />
                <span className="Error">{formState.errors.password?.message}</span>

                <button>Login</button>

            </form>

        </div>
    );
}

export default Login;

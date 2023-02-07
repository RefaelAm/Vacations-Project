import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Register.css";

function Register(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<UserModel>();
    const navigate = useNavigate();

    async function send(user: UserModel) {
        try {
            await authService.register(user);
            notifyService.success("Welcome!");
            navigate("/home");
        }
        catch(err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Register Box">

            <form onSubmit={handleSubmit(send)}>

                <h2>Register</h2>

                <label>First name: </label>
                <input type="text" {...register("firstName", UserModel.firstNameValidation)} />
                <span className="Error">{formState.errors.firstName?.message}</span>

                <label>Last name: </label>
                <input type="text" {...register("lastName", UserModel.lastNameValidation)} />
                <span className="Error">{formState.errors.lastName?.message}</span>

                <label>Username: </label>
                <input type="text" {...register("username", UserModel.usernameValidation)} />
                <span className="Error">{formState.errors.username?.message}</span>

                <label>Password: </label>
                <input type="password" {...register("password", UserModel.passwordValidation)} />
                <span className="Error">{formState.errors.password?.message}</span>

                <button>Register</button>

            </form>

        </div>
    );
}

export default Register;

class Config {
    public vacationsUrl = "http://localhost:3001/api/vacations/";
    public likedVacationsUrl = "http://localhost:3001/api/liked-vacations/";
    public vacationImagesUrl = "http://localhost:3001/api/vacations/images/";
    public registerUrl = "http://localhost:3001/api/auth/register/";
    public loginUrl = "http://localhost:3001/api/auth/login/";
    public usersUrl = "http://localhost:3001/api/users/";
}
const appConfig = new Config();

export default appConfig;

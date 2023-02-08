import { Notyf } from "notyf";

class NotifyService {
    private notify = new Notyf({
        duration: 3000,
        position: { x: "center", y: "top" },
        dismissible: true
    });

    public success(message: string): void {
        this.notify.success(message);
    }

    public error(err: any): void {
        const message = this.extractErrorMessage(err);
        this.notify.error(message);
    }

    private extractErrorMessage(err: any): string {
        if (typeof err === "string") return err;
        if (typeof err.response?.data === "string") return err.response.data;
        if (Array.isArray(err.response?.data)) return err.response.data[0];
        if (typeof err.message === "string") return err.message;
        return "Some error occurred, please try again";
    }
}
const notifyService = new NotifyService();

export default notifyService;

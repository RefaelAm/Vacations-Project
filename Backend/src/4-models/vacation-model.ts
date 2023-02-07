import { UploadedFile } from "express-fileupload";
import Joi from "joi";

 class VacationModel {
    public vacationId: number;
    public destination: string;
    public description: string;
    public startDate: string;
    public endDate: string;
    public price: number;
    public image?: UploadedFile;

    public imageName: string;

    public constructor (vacation: VacationModel) {
        this.vacationId = vacation.vacationId;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
        this.image = vacation.image;

        this.imageName = vacation.imageName
    }

    public static validationSchema = Joi.object({
        vacationId: Joi.number().optional().positive().integer(),
        destination: Joi.string().required().min(2).max(50),
        description: Joi.string().required().min(10).max(1000),
        startDate: Joi.string().required(),
        endDate: Joi.string().required(),
        price: Joi.number().required().min(0).max(100000),
        image: Joi.object().optional(),
        imageName: Joi.optional()
    })

    public validate(): string {
        const result = VacationModel.validationSchema.validate(this);
        return result.error?.message;
    }
 }

 export default VacationModel;
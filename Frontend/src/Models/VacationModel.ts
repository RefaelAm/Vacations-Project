
 class VacationModel {
    public vacationId: number;
    public destination: string;
    public description: string;
    public startDate: string;
    public endDate: string;
    public price: number;
    public image?: FileList;

    public imageName: string;

    public followersCount: number;
    public isFollowing: number;

    public constructor (vacation: any) {
        this.vacationId = vacation.vacationId;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
        this.image = vacation.image;
        
         this.imageName = vacation.imageName;
         this.followersCount = vacation.followersCount;
         this.isFollowing = vacation.isFollowing;
    }

    
    public static destinationValidation = {
        required: { value: true, message: "Missing a destination" },
        minLength: { value: 2, message: "Destination name too short" },
        maxLength: { value: 50, message: "Destination name too long" }
    }

    public static descriptionValidation = {
        required: { value: true, message: "Missing a description" },
        minLength: { value: 10, message: "Description too short" },
        maxLength: { value: 1000, message: "Description too long" }
    }

    public static startDateValidation = {
        required: { value: true, message: "Missing a start date" }
    }

    public static endDateValidation = {
        required: { value: true, message: "Missing a start date" },
    }

    public static priceValidation = {
        required: { value: true, message: "Missing price" },
        min: { value: 0, message: "Price can't be negative" },
        max: { value: 100000, message: "Price can't exceed 100,000" }
    }

 }

 export default VacationModel;
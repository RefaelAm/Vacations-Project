import dal from "../2-utils/dal";
import { ErrorModel, ResourceNotFoundErrorModel, ValidationErrorModel } from "../4-models/error-models";
import VacationModel from "../4-models/vacation-model";
import { OkPacket } from "mysql";
import fs from "fs";
import { v4 as uuid } from "uuid";
import FollowerModel from "../4-models/follower-model";

// Get all vacation:
async function getAllVacations(): Promise<VacationModel[]> {
  const sql = ` SELECT *
                  FROM vacations`;

  const vacations = await dal.execute(sql, {});
  return vacations;
}


// Get all vacations by current user:
async function getLikedVacationsByUser(userId: number) {

    const sql = `
          SELECT DISTINCT
          V.vacationId, destination, description, DATE_FORMAT(startDate,'%Y-%m-%D') AS startDate, DATE_FORMAT(endDate,'%Y-%m-%d') AS endDate, price, imageName, 
              EXISTS(SELECT * FROM followers WHERE vacationId = F.vacationId AND userId = ?) AS isFollowing,
              COUNT(F.userId) AS followersCount
          FROM vacations AS V LEFT JOIN followers AS F
          ON V.vacationId = F.vacationId
          GROUP BY vacationId
          ORDER BY startDate DESC
      `;
    const vacations = await dal.execute(sql, [userId]);
    return vacations;
//   }
}

//Get one vacation:
async function getOneVacation(vacationId: number) {
  const sql = `
            SELECT vacationId, destination, description, DATE_FORMAT(startDate,'%Y-%m-%d') AS startDate, DATE_FORMAT(endDate,'%Y-%m-%d') AS endDate, price, imageName FROM vacations WHERE vacationId = ?
        `;
  const vacations = await dal.execute(sql, [vacationId]);
  const vacation = vacations[0];
  if(!vacation) throw new ResourceNotFoundErrorModel(vacationId)
  return vacation;
}

//Add vacation:
async function addVacation(vacation: VacationModel): Promise<VacationModel> {
  const errors = vacation.validate();
  if (errors) throw new ValidationErrorModel(errors);

  if (vacation.image) {
    const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf("."))
    vacation.imageName = uuid() + extension;
    await vacation.image.mv("./src/1-assets/images/" + vacation.imageName);
    delete vacation.image;
}

  const sql = `
    INSERT INTO vacations(
        vacationId,
        destination,
        description,
        startDate,
        endDate,
        price,
        imageName
    )
    VALUES(
        Default,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
        )
`;

  const info: OkPacket = await dal.execute(sql, [
    vacation.destination,
    vacation.description,
    vacation.startDate,
    vacation.endDate,
    vacation.price,
    vacation.imageName
  ]);
     
  vacation.vacationId = info.insertId;
  return vacation;
}


// Update existing vacation: 
async function updateVacation(vacation: VacationModel): Promise<VacationModel> {

    const error = vacation.validate();
    if(error) throw new ValidationErrorModel(error);
    
    if (vacation.image) {

        if (fs.existsSync("./src/1-assets/images/" + vacation.imageName)) {

            fs.unlinkSync("./src/1-assets/images/" + vacation.imageName);
        }

        const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf("."))
        vacation.imageName = uuid() + extension;
        await vacation.image.mv("./src/1-assets/images/" + vacation.imageName);
        delete vacation.image;
    }

    const sql = `
        UPDATE vacations SET
          destination = ? ,
          description = ? ,
          startDate = ? ,
          endDate = ? ,
          price = ? ,
          imageName = ?
        WHERE vacationId = ?
    `;

    const info: OkPacket = await dal.execute(sql, [
        vacation.destination,
        vacation.description,
        vacation.startDate,
        vacation.endDate,
        vacation.price,
        vacation.imageName,
        vacation.vacationId]);

    if(info.affectedRows === 0) throw new ResourceNotFoundErrorModel(vacation.vacationId);
    return vacation;
}

// Delete vacation:
async function deleteVacation(vacationId: number): Promise<void> {

    let vacations = getAllVacations();
    let vacation = (await vacations).find(v => v.vacationId === vacationId);

    if (fs.existsSync("./src/1-assets/images/" + vacation.imageName)) {
         fs.unlinkSync("./src/1-assets/images/" + vacation.imageName);
     }

    const sql = `DELETE FROM vacations WHERE vacationId = ?`;
    

    const info: OkPacket = await dal.execute(sql, [vacationId]);
    if(info.affectedRows === 0) throw new ResourceNotFoundErrorModel(vacationId);
}

async function getAllFollowers(): Promise<FollowerModel[]> {
    const sql = ` SELECT *
                    FROM followers`;
  
    const followers = await dal.execute(sql, {});
    return followers;
  }

//Add follower:
async function addFollower(userId: number, vacationId: number): Promise<void> {

    const sql = `
      INSERT INTO followers(
          vacationId,
          userId
      )
      VALUES(
          ?,
          ?
          )
  `;
  
    const info: OkPacket = await dal.execute(sql, [
      vacationId,
      userId
    ]);
  }

  // Delete follower:
async function deleteFollower(vacationId: number, userId: number): Promise<void> {

    const sql = `DELETE FROM followers WHERE vacationId = ? AND userId = ?`;
    
    const info: OkPacket = await dal.execute(sql, [vacationId, userId]);
    if(info.affectedRows === 0) throw new ResourceNotFoundErrorModel(vacationId||userId);
}
  
  


export default {
  getAllVacations,
  getLikedVacationsByUser,
  getOneVacation,
  addVacation,
  updateVacation,
  deleteVacation,
  getAllFollowers,
  addFollower,
  deleteFollower
};

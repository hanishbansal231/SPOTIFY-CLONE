import UserModel from '@models/user.model';
import { User } from '@shared/interface/model.interface';

class UserService {
   constructor() {}

   async register(input: User): Promise<User | null> {
      try {
         const { firstName, lastName, email, username, password, mobile_number, gender } = input;

         // Basic input validation
         if (![firstName, lastName, email, username, password, mobile_number, gender].every(Boolean)) {
            throw new Error('All fields are required...');
         }

         // Check if the user already exists
         const existingUser = await UserModel.findOne({ email });
         if (existingUser) {
            throw new Error('User already registered...');
         }

         // Create the new user
         const user = await UserModel.create({
            firstName,
            lastName,
            email,
            username,
            password,
            mobile_number,
            gender
         });

         // Check if the user was created successfully
         if (!user) {
            throw new Error('User registration failed, please try again...');
         }

         return user.toObject() as User; // Convert Mongoose Document to plain JavaScript object

      } catch (error) {
         console.error(error);
         throw error; // Re-throw the error to handle it elsewhere
      }
   }
}

export default UserService;

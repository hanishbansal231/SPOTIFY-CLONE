import UserModel from '@models/user.model';
import { User } from '@shared/interface/model.interface';

export const getAllUser = async () => {
   try {
      const users = await UserModel.find({});
      return users;
   } catch (error) {
      console.log(error);
   }
};

export const register = async (_: unknown, { input }: { input: User }) => {
   try {
      const { firstName, lastName, email, username, password, mobile_number, gender } = input;

      // Basic input validation
      if ([ firstName, lastName, email, username, password, mobile_number, gender ].some(item => !item)) {
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

      return {
         message: 'User registered successfully!',
         status: true,
         user,
       };
   } catch (error) {
      console.error(error);
      if (error instanceof Error) {
         return {
           message: error.message,
           status: false,
           user: null,
         };
       } else {
         return {
           message: 'An unknown error occurred',
           status: false,
           user: null,
         }
      }
   }
};

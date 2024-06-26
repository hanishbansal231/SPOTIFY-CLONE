import UserModel from '@models/user.model';
import { User } from '@shared/interface/model.interface';
import UserService from '@src/services/user.service';
import ApiResponse from '@src/utils/apiResponse';

const userService = new UserService();

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
      // const { firstName, lastName, email, username, password, mobile_number, gender } = input;

     const response = await userService.register(input);

      // Return a structured ApiResponse object
      return new ApiResponse<User>({
         message: 'User registered successfully!',
         status: true,
         dataKey: 'user',
         data: response as User
      });
   } catch (error) {
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

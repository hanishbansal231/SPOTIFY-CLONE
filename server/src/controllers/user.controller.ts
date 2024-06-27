import UserModel from '@models/user.model';
import { User, UserVerifyInput } from '@shared/interface/model.interface';
import UserService from '@src/services/user.service';
import ApiResponse from '@src/utils/apiResponse';
import sendEmail from '@src/utils/sendEmail';

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
            user: null
         };
      } else {
         return {
            message: 'An unknown error occurred',
            status: false,
            user: null
         };
      }
   }
};

export const userVerify = async (_: unknown, { input }: { input: UserVerifyInput }) => {
   try {
      const { email } = input;

      const response = await sendEmail(email,'send email','Hello');

      console.log(response);

   } catch (error) {
      if (error instanceof Error) {
         console.log(error)
         return {
            message: error.message,
            status: false,
         };
      } else {
         return {
            message: 'An unknown error occurred',
            status: false,
         };
      }
   }
};

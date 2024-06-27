import { Document } from 'mongoose';
import { Gender } from '../enums/model.enum';

export interface User extends Document {
   firstName: string;
   lastName: string;
   email: string;
   username: string;
   password: string;
   mobile_number: number;
   gender: Gender;
   access_token?: string;
   refresh_token?: string;
   forgotPasswordToken?: string;
   forgotPasswordExpiryDate?: Date;
   device_information?: string;
   user_image?: UserImage;
}

export interface UserImage extends Document {
   url: string;
   public_id: string;
}


export interface UserVerifyInput extends Document {
   email: string;
};
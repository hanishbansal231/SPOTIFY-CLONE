import { model, Schema, CallbackError } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '@shared/interface/model.interface';
import crypto from 'crypto';

const userSchema: Schema<User> = new Schema(
   {
      firstName: {
         type: String,
         required: [ true, 'Firstname is required...' ],
         lowercase: true,
         trim: true
      },
      lastName: {
         type: String,
         required: [ true, 'Lastname is required...' ],
         lowercase: true,
         trim: true
      },
      email: {
         type: String,
         required: [ true, 'Email is required...' ],
         match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please fill in a valid email address'
         ],
         trim: true,
         lowercase: true
      },
      username: {
         type: String,
         required: [ true, 'Username is required...' ],
         unique: true,
         lowercase: true,
         trim: true
      },
      password: {
         type: String,
         required: [ true, 'Password is required...' ],
         minLength: [ 8, 'Password must be at least 8 charchter' ],
         select: false,
         match: [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Please fill in a valid Password'
         ]
      },
      mobile_number: {
         type: Number,
         required: [ true, 'Mobile Number is required...' ],
         unique: true
      },
      gender: {
         type: String,
         enum: [ 'MALE', 'FEMALE' ],
         required: [ true, 'Gender is required...' ]
      },
      device_information: {
         type: Schema.Types.ObjectId,
         ref: 'Device'
      },
      user_image:{
        url:{
          type:String,
        },
        public_id:{
          type:String
        }
      },
      access_token: String,
      refresh_token: String,
      forgotPasswordToken: String,
      forgotPasswordExpiryDate: Date
   },
   {
      timestamps: true
   }
);

userSchema.pre<User>('save', async function (next) {
   try {
      if (!this.isModified('password')) {
         return next();
      }
      const hashSalt = process.env.SALT || 10;
      this.password = await bcrypt.hash(this.password, hashSalt);
      next();
   } catch (error) {
      next(error as CallbackError);
   }
});

userSchema.methods = {
   generateAccessToken () {
      return jwt.sign(
         {
            id: this?.id
         },
         process.env.ACCESS_TOKEN ?? '',
         {
            expiresIn: process.env.JWT_EXPIRY
         }
      );
   },
   async comparePassword (planTextPassword: string) {
      return await bcrypt.compare(planTextPassword, this.password);
   },
   forgotPasswordTokenGenerated () {
      const resetToken = crypto.randomBytes(20).toString();

      this.forgotPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

      this.forgotPasswordExpiryDate = Date.now() * 15 * 60 * 1000;
      return resetToken;
   }
};

const UserModel = model<User>('User', userSchema);
export default UserModel;

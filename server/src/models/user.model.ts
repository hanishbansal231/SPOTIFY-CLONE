import mongoose, { model, Schema, CallbackError } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '@shared/interface/model.interface';
import crypto from 'crypto';

const userSchema: Schema<User> = new Schema(
  {
    firstName: {
      type: String,
      require: [true, 'Firstname is required...'],
    },
    lastName: {
      type: String,
      require: [true, 'Lastname is required...'],
    },
    email: {
      type: String,
      required: [true, 'Email is required...'],
    },
    username: {
      type: String,
      require: [true, 'Username is required...'],
      unique: true,
    },
    password: {
      type: String,
      require: [true, 'Password is required...'],
    },
    mobile_number: {
      type: Number,
      require: [true, 'Mobile Number is required...'],
      unique: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      require: [true, 'Gender is required...'],
    },
    access_token: String,
    refresh_token: String,
    forgotPasswordToken: String,
    forgotPasswordExpiryDate: Date,
  },
  {
    timestamps: true,
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
  generateAccessToken: function () {
    return jwt.sign(
      {
        id: this?.id,
      },
      process.env.ACCESS_TOKEN ?? '',
      {
        expiresIn: process.env.JWT_EXPIRY,
      }
    );
  },
  comparePassword: async function (planTextPassword: string) {
    return await bcrypt.compare(planTextPassword, this.password);
  },
  forgotPasswordTokenGenerated: function () {
    const resetToken = crypto.randomBytes(20).toString();

    this.forgotPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    this.forgotPasswordExpiryDate = Date.now() * 15 * 60 * 1000;
    return resetToken;
  },
};

const User = model<User>('User', userSchema);
export default User;

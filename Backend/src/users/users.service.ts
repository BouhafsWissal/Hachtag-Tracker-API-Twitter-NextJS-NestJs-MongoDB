import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user/user';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(user: User): Promise<User> {
    const { motdepasse, email, ...userData } = user;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(motdepasse, saltRounds);

    if (email === 'admin@gmail.com') {
      userData.role = 'admin';
    } else {
      userData.role = 'user';
    }

    const createdUser = new this.userModel({
      motdepasse: hashedPassword,
      email,
      ...userData,
    });
    return createdUser.save();
  }

  async updateUser(id: string, user: User): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
  }

  async deleteUser(id: string): Promise<User> {
    return this.userModel.findByIdAndRemove(id).exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }
}

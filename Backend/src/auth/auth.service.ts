/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<string> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.motdepasse);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const payload = {
      id: user._id,
      email: user.email,
      nom: user.nom, 
      prenom:user.prenom,
      role: user.role,
    }; // Utilisez toString() pour obtenir l'ID en tant que chaîne de caractères
    const token = this.jwtService.sign(payload);
    return token;
  }
}

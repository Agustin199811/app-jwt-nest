import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { RolesModule } from '../roles/roles.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtConstant } from 'src/constants/jwt.constant';
import { JwtStrategy } from './strategy/auth.strategy';
import * as dotenv from 'dotenv';

dotenv.config();
@Module({
  imports: [UsersModule, RolesModule, JwtModule.register({
    global: true,
    secret: JwtConstant.secret,
    signOptions: { expiresIn: process.env.JWT_TIME }
  })],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule { }

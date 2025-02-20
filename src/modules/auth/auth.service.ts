import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RolesService } from '../roles/roles.service';
import { RegisterUserDto } from './dto/auth.register.dto';
import * as bcryptjs from 'bcryptjs';
import { RoleEnum } from '../roles/enum/role.enum';
import { LoginUserDto } from './dto/auth.login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly rolesService: RolesService,
        private readonly jwtService: JwtService
    ) { }

    public async registerUser(registerDto: RegisterUserDto) {
        const user = await this.usersService.findOneUserByEmail(registerDto.email);
        if (user) {
            throw new BadRequestException('User already exists');
        }

        const passwordHash = await bcryptjs.hash(registerDto.password, 10);

        const userRole = await this.rolesService.findOneRoleByName(RoleEnum.USER);
        if (!userRole) {
            throw new BadRequestException(`Role with name ${userRole} does not exist`);
        }

        return await this.usersService.createUser({
            ...registerDto,
            password: passwordHash,
            createAt: new Date(),
            roles: [userRole]
        })
    }

    public async signIn(loginDto: LoginUserDto) {
        const user = await this.usersService.findOneUserByEmail(loginDto.email);
        if (!user) {
            throw new UnauthorizedException('Email is wrong');
        }

        const isValidPassword = await bcryptjs.compare(loginDto.password, user.password);
        if (!isValidPassword) {
            throw new UnauthorizedException('Password is wrong');
        }

        const payload = { email: user.email };
        const token = await this.jwtService.signAsync(payload);

        return {
            email: user.email,
            token
        }
    }
}

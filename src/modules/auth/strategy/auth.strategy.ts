import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtConstant } from "src/constants/jwt.constant";
import { UsersService } from "src/modules/users/users.service";
import { UserProfile } from "../interface/auth.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private readonly usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: JwtConstant.secret as any,
        })
    }

    async validate(payload: { email: string }): Promise<UserProfile> {
        const user = await this.usersService.findOneUserByEmail(payload.email);
        if (!user) {
            throw new UnauthorizedException('token is invalid or users does not exist');
        }

        const { id, name, email, roles } = user;
        const rolesName = roles.map((role)=> role.name);
        return { id, name, email, roles: rolesName };
    }
}
import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/auth.register.dto';
import { LoginUserDto } from './dto/auth.login.dto';
import { JwtAuthGuard } from './guard/auth.guard';
import { UserProfile } from './interface/auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("register")
  public register(@Body() registerDto: RegisterUserDto) {
    try {
      const user = this.authService.registerUser(registerDto);
      if (!user) {
        throw new HttpException("User doesnt save", HttpStatus.NO_CONTENT);
      }
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post("login")
  public login(@Body() loginDto: LoginUserDto) {
    try {
      const user = this.authService.signIn(loginDto);
      if (!user) {
        throw new HttpException("Invalid session", HttpStatus.NO_CONTENT);
      }
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  public profile(@Req() req: any): UserProfile {
    const { id, name, email, roles } = req.user;
    return { id, name, email, roles };
  }
}

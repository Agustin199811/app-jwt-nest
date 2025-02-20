import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class LoginUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @IsNotEmpty()
    password: string;
}
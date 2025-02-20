import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, Length, Matches, MaxLength } from "class-validator";

export class RegisterUserDto {
    @Transform(({ value }) => value.trim())
    @IsString()
    @IsNotEmpty()
    @Length(10, 15)
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Transform(({ value }) => value.trim())
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/, {
        message: 'Password must contain both letters and numbers',
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(8)
    password: string;
}
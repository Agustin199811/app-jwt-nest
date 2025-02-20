import { Transform } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDto {
    @Transform(({ value }) => value.toLowerCase())
    @IsString()
    @IsNotEmpty()
    name: string;
}

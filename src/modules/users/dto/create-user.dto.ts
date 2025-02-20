import { Role } from "src/modules/roles/entities/role.entity";

export class CreateUserDto {
    name: string;
    email: string;
    password: string;
    createAt: Date;
    updateAt?: Date;
    deleteAt?: Date;
    roles: Role[];
}

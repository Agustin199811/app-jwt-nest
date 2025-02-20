import { Injectable, OnModuleInit } from "@nestjs/common";
import { RoleEnum } from "../enum/role.enum";
import { RolesService } from "../roles.service";

@Injectable()
export class RoleSeed implements OnModuleInit {
    constructor(private readonly rolesService: RolesService) { }
    async onModuleInit() {
        await this.seedRole();
    }

    private async seedRole() {
        const roles = Object.values(RoleEnum);

        for (const role of roles) {
            const existRole = await this.rolesService.findOneRoleByName(role);
            if (!existRole) {
                await this.rolesService.createRole({ name: role });
                console.log(`Role created : ${role}`);
            }
        }
    }
}
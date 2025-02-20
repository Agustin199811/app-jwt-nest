import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ) { }

  public async createRole(createDto: CreateRoleDto): Promise<Role> {
    const role = await this.roleRepository.findOneBy({ name: createDto.name });
    if (role) {
      throw new BadRequestException('ROle already exists');
    }

    const roles = this.roleRepository.create(createDto);
    return await this.roleRepository.save(roles);
  }

  public async findOneRoleByName(name: string): Promise<Role | null> {
    const role = await this.roleRepository.findOneBy({ name });
    return role;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { In, Repository } from 'typeorm';
import { Role } from '../roles/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>

  ) { }

  public async createUser(createDto: CreateUserDto): Promise<User> {
    let roles: Role[] = [];
    if (createDto.roles && createDto.roles.length > 0 && typeof createDto.roles[0] === 'object') {
      roles = createDto.roles;
    } else if (createDto.roles && createDto.roles.length > 0) {
      roles = await this.roleRepository.findBy({ name: In(createDto.roles) });
    }

    const users = this.userRepository.create({ ...createDto, roles });
    return await this.userRepository.save(users);
  }

  public async findOneUserByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ email });
    return user;
  }
}

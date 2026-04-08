import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {

  constructor(
      @InjectRepository(Role)
      private roleRepository: Repository<Role>
    ) {}

  async createRole(dto: CreateRoleDto) {
    const role = await this.roleRepository.create(dto);
    return await this.roleRepository.save(role);
  }

  async getRoleByName(name: string) {
    return await this.roleRepository.findOneBy({name});
  }
}

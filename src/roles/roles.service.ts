import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll(): Promise<Role[]> {
    const roles = this.roleRepository.find();
    if (!roles) {
      throw new NotFoundException(`There is no roles at all`);
    }
    return roles;
  }

  async hardRemove(id: number): Promise<void> {
    const result = await this.roleRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}

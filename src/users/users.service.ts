import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/roles/roles.entity';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private rolesService: RolesService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User | unknown> {
    const { user_role, ...userData } = createUserDto;
    const role = await this.rolesService.getRoleByName(user_role || "viewer");
    if (role) {
      userData['roles'] = [role as Role];
    }
    const user = await this.usersRepository.create(userData);
    return await this.usersRepository.save(user);

    // await dataSource
    // .createQueryBuilder()
    // .relation(User, "roles")
    // .of(userId) // The ID of the user
    // .add(roleId); // The ID of the role to add
  }

  async findAll(withDeleted?: boolean): Promise<User[]> {
    const users = this.usersRepository.find({ withDeleted });
    if (!users) {
      throw new NotFoundException(`There is no users at all`);
    }
    return users;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ 
      where: { id },
      relations: {
        roles: true
      }
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    const { password, ...result } = user;
    return result;
  }

  async findUserByName(username: string): Promise<User> {
    const user = await this.usersRepository.findOne({ 
      where: { username },
      relations: {
        roles: true,
        refreshTokens: true
      }
    });
    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }
    // const { password, ...result } = user;
    // return result;
    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async findUserByPhone(phone: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ phone });
    if (!user) {
      throw new NotFoundException(`User with phone ${phone} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = {...updateUserDto};
    if (user.password && typeof user.password === 'string') {
      user.password = await bcrypt.hash(user.password, 4);
    }
    await this.usersRepository.update({id}, user);
    return this.findOne(id);
  }

  async save(dto: UpdateUserDto): Promise<User> {
    const user = {...dto};
    if (user.password && typeof user.password === 'string') {
      user.password = await bcrypt.hash(user.password, 4);
    }
    return await this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    let result;

    const user = await this.usersRepository.findOne({
      where: { id },
      
      relations: { 
        orders: {
          orderDetails: true
        },
        refreshTokens: true
      }
    });

    if (user !== null) {
      result = await this.usersRepository.softRemove(user);
    }
    
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async hardRemove(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}

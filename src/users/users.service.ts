import {
  ConflictException,
  Injectable,
  NotFoundException,
  OnApplicationBootstrap
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { Role } from 'src/roles/roles.entity';
import { RolesService } from 'src/roles/roles.service';
import { CreateAgreementDto } from 'src/agreements/dto/create-agreement.dto';
import { AgreementsService } from 'src/agreements/agreements.service';
import { CreateRoleDto } from 'src/roles/dto/create-role.dto';

@Injectable()
export class UsersService implements OnApplicationBootstrap {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private rolesService: RolesService,
    private agreementService: AgreementsService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User | unknown> {
    const { user_role, ...userData } = createUserDto;
    const role = await this.rolesService.getRoleByName(user_role || "viewer");
    if (role) {
      userData['roles'] = [role as Role];
    }
    const user = await this.usersRepository.create({...userData, user_role});
    return await this.usersRepository.save(user);
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
        roles: true,
        agreements: true,
        orders: {
          order_details: true
        }
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
    const { password, ...result } = user;
    return result;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    const { password, ...result } = user;
    return result;
  }

  async findUserByPhone(phone: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ phone });
    if (!user) {
      throw new NotFoundException(`User with phone ${phone} not found`);
    }
    const { password, ...result } = user;
    return result;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update({id}, updateUserDto);
  }

  async remove(id: number): Promise<void> {
    let result;

    const user = await this.usersRepository.findOne({
      where: { id },
      
      relations: { 
        orders: {
          order_details: true
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

  async addAgreement(dto: CreateAgreementDto, req) {
    let user = await this.findOne(req?.user.sub);
    const agreement = await this.agreementService.getAgreementByName(dto.name);
    if (!agreement) {
      throw new NotFoundException(`Aagreement with name ${dto.name} not found`);
    }
    const alreadyHave = user.agreements.findIndex(item => item.name === dto.name) !== -1;
    if (alreadyHave) {
      throw new ConflictException(`Already agreed`);
    }
    user.agreements.push(agreement);
    return await this.usersRepository.save(user);
  }

  async removeAgreement(dto: CreateAgreementDto, req) {
    let user = await this.findOne(req?.user.sub);
    const agreement = await this.agreementService.getAgreementByName(dto.name);
    if (!agreement) {
      throw new NotFoundException(`Aagreement with name ${dto.name} not found`);
    }
    const index = user.agreements.findIndex(item => item.name === dto.name);
    if (index !== -1) {
      user.agreements.splice(index, 1); // Removes 1 item at the found index
    }
    return await this.usersRepository.save(user);
  }

  async onApplicationBootstrap() {
    const defaultRoles: CreateRoleDto[] = [
      { name: 'admin', description: 'Администратор' },
      { name: 'viewer', description: 'Посетитель' },
      { name: 'editor', description: 'Редактор' },
      { name: 'manager', description: 'Менеджер' }
    ];

    const defaultAdmin: CreateUserDto = {
      username: 'john',
      password: 'changeme',
      user_role: 'admin'
    };

    defaultRoles.forEach(async role => {
      const roleExists = await this.rolesService.getRoleByName(role.name);
      if (!roleExists) {
        await this.rolesService.createRole(role);
      }
    });

    const userExists = await this.usersRepository.findOneBy({ username: defaultAdmin.username });
    if (!userExists) {
      await this.create(defaultAdmin);
    }
  }
}

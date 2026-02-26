import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';

@Injectable()
export class UsersService {
  // private readonly users: User[] = [
  //   {
  //     id: 1,
  //     name: '',
  //     email: '',
  //     username: 'john',
  //     password: 'changeme',
  //     user_role: 'viewer'
  //   },
  //   {
  //     id: 2,
  //     name: '',
  //     email: '',
  //     username: 'maria',
  //     password: 'guess',
  //     user_role: 'viewer'
  //   },
  // ];

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // async findUser(username: string): Promise<User | undefined> {
  //   return this.users.find(user => user.username === username);
  // }

  async create(createUserDto: CreateUserDto): Promise<User | unknown> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);

    // try {
    //   return await this.usersRepository.save(createUserDto);
    // } catch (error) {
    //   if (error instanceof QueryFailedError) {

    //   console.warn('################################################################');
    //   console.warn('error.driverError.code', error.driverError.code);
    //   console.warn('################################################################');
    //   console.warn('error["detail"]', error['detail']);
    //   console.warn('################################################################');
    //   console.warn('error', error);
    //   console.warn('################################################################');

    //     // PostgreSQL unique_violation error code is '23505'
    //     if (error.driverError.code === '23505') { 
    //       throw new ConflictException('A user with this email already exists.');
    //     }
    //   }
    //   console.warn('################################################################');
    //   console.warn('error.detail', error.detail);
    //   console.warn('error.driverError.code', error.driverError.code);
    //   console.warn('################################################################');
    //   throw error; // Re-throw other errors
    // }
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({withDeleted: true});
  }

  async findOne(id: number): Promise<User> {
    console.warn('FIRE findOne, id = ', id);
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findUserByName(username: string): Promise<User> {
    console.warn('FIRE findUserByName, username = ', username);
    const user = await this.usersRepository.findOneBy({ username });
    if (!user) {
      throw new NotFoundException(`User with ID ${username} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | undefined> {
    await this.usersRepository.update({id}, updateUserDto);
    return this.findOne(id);
  }

  // async remove(username: string): Promise<void> {
  //   const result = await this.usersRepository.delete({ username });
  //   if (result.affected === 0) {
  //     throw new NotFoundException(`User with ID ${username} not found`);
  //   }
  // }

  async remove(id: string): Promise<void> {
    console.warn('FIRE remove, id = ', id);
    const result = await this.usersRepository.softDelete(Number(id));
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}

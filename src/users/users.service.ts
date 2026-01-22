import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      name: '',
      email: '',
      username: 'john',
      password: 'changeme',
    },
    {
      id: 2,
      name: '',
      email: '',
      username: 'maria',
      password: 'guess',
    },
  ];

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(id: number): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async findUser(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
  

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  // async findOne(id: number): Promise<User> {
  //   const user = await this.usersRepository.findOneBy({ id });
  //   if (!user) {
  //     throw new NotFoundException(`User with ID ${id} not found`);
  //   }
  //   return user;
  // }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | undefined> {
    await this.usersRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

}

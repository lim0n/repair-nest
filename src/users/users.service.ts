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
      user_role: 'viewer'
    },
    {
      id: 2,
      name: '',
      email: '',
      username: 'maria',
      password: 'guess',
      user_role: 'viewer'
    },
  ];

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

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

  async findOne(username: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ username });
    if (!user) {
      throw new NotFoundException(`User with ID ${username} not found`);
    }
    return user;
  }

  async update(username: string, updateUserDto: UpdateUserDto): Promise<User | undefined> {
    await this.usersRepository.update(username, updateUserDto);
    return this.findOne(username);
  }

  async remove(username: string): Promise<void> {
    const result = await this.usersRepository.delete({ username });
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${username} not found`);
    }
  }
}

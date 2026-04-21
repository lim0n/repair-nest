import { Injectable } from '@nestjs/common';
import { CreateRefreshTokenDto } from './dto/create-refresh-token.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from './entities/refresh-token.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RefreshTokenService {

  constructor(
    @InjectRepository(RefreshToken)
    private tokensRepository: Repository<RefreshToken>,
  ) { }

  async create(createRefreshTokenDto: CreateRefreshTokenDto): Promise<RefreshToken> {
    const allowedDevicesCount = 4;
    const token = await this.tokensRepository.create(createRefreshTokenDto);

    // const tokens = await this.tokensRepository.find({
    //   where: {
    //     user_id: createRefreshTokenDto.user_id,
    //   },
    //   order: {
    //     created_at: 'DESC',
    //   },
    // });
    const tokens = await this.findByUserId(createRefreshTokenDto.user_id);

    if (tokens.length > allowedDevicesCount) {
      let oldestTokens = tokens.slice(allowedDevicesCount);
      oldestTokens.forEach(oldToken => {
        this.hardRemove(oldToken.id)
      })
    }

    return await this.tokensRepository.save(token);
  }

  async findByUserId(user_id: number): Promise<RefreshToken[]> {
    return await this.tokensRepository.find({ 
      where: { user_id },
      order: {
        created_at: 'DESC',
      },
    });
  }

  async findAll(withDeleted?: boolean): Promise<RefreshToken[]> {
    return await this.tokensRepository.find();
  }

  async hardRemove(id: number) {
    return await this.tokensRepository.delete(id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RefreshTokenService } from './refresh-token.service';
import { CreateRefreshTokenDto } from './dto/create-refresh-token.dto';

@Controller('refresh-token')
export class RefreshTokenController {
  constructor(private readonly refreshTokenService: RefreshTokenService) {}

  @Post()
  create(@Body() createRefreshTokenDto: CreateRefreshTokenDto) {
    return this.refreshTokenService.create(createRefreshTokenDto);
  }

  @Get()
  findAll() {
    return this.refreshTokenService.findAll();
  }

  @Get(':id')
  findByUserId(@Param('id') id: number) {
    return this.refreshTokenService.findByUserId(id);
  }

  @Delete(':id')
  hardRemove(@Param('id') id: number) {
    return this.refreshTokenService.hardRemove(id);
  }
}

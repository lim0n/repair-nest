import { Module } from '@nestjs/common';
import { AgreementsService } from './agreements.service';
import { AgreementsController } from './agreements.controller';
import { Agreement } from './entities/agreement.entity';
import { User } from 'src/users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Agreement]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AgreementsController],
  providers: [AgreementsService],
  exports: [AgreementsService]
})
export class AgreementsModule {}

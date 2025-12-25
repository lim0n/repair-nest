import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RepairRequestModule } from './repair-request/repair-request.module';

@Module({
  imports: [RepairRequestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

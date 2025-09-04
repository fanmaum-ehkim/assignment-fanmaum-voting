import { Module } from '@nestjs/common';
import { StarController } from './star.controller';
import { StarService } from './star.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [StarController],
  providers: [StarService],
  exports: [StarService],
})
export class StarModule {}

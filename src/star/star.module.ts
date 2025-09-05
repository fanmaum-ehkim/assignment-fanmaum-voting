import { Module } from '@nestjs/common';
import { StarController } from './star.controller';
import { StarService } from './star.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { StarResolver } from './star.resolver';

@Module({
  imports: [PrismaModule],
  controllers: [StarController],
  providers: [StarService, StarResolver],
  exports: [StarService],
})
export class StarModule {}

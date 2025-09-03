import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { VoteModule } from './vote/vote.module';
import { StarModule } from './star/star.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, VoteModule, StarModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

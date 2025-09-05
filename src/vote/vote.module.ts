import { Module } from '@nestjs/common';
import { VoteService } from './vote.service';
import { VoteController } from './vote.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { VoteCampaignResolver } from './resolver/vote-campaign.resolver';
import { VotingLogResolver } from './resolver/voting-log.resolver';
import { VoteCampaignCandidateStarResolver } from './resolver/vote-campaign-candidate-star.resolver';
import { StarModule } from '../star/star.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, StarModule],
  controllers: [VoteController],
  providers: [
    VoteService,
    VoteCampaignResolver,
    VotingLogResolver,
    VoteCampaignCandidateStarResolver,
  ],
  exports: [VoteService],
})
export class VoteModule {}

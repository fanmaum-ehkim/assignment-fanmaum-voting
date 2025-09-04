import { Module } from '@nestjs/common';
import { VoteService } from './vote.service';
import { VoteController } from './vote.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { 
  VoteCampaignResolver, 
  VoteCampaignDetailResolver, 
  VoteCampaignDetailStarResolver 
} from './resolver/vote-campaign.resolver';
import { VotingLogResolver } from './resolver/voting-log.resolver';
import { VoteCampaignCandidateResolver } from './resolver/vote-campaign-candidate.resolver';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [VoteController],
  providers: [
    VoteService,
    VoteCampaignResolver,
    VoteCampaignDetailResolver,
    VoteCampaignDetailStarResolver,
    VotingLogResolver,
    VoteCampaignCandidateResolver,
  ],
  exports: [VoteService],
})
export class VoteModule {}

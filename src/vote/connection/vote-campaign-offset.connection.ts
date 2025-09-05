import { ObjectType } from '@nestjs/graphql';
import { OffsetConnection } from '../../common/dto/offset.connection';
import { VoteCampaignDto } from '../dto/vote-campaign.dto';

@ObjectType('VoteCampaignOffsetConnection')
export class VoteCampaignOffsetConnection extends OffsetConnection<VoteCampaignDto> {}

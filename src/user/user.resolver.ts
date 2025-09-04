import {
  ID,
  Parent,
  Query,
  Args,
  ResolveField,
  Resolver,
  Mutation,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/auth/decorator/user.decorator';
import { CurrentUserDto } from 'src/auth/dto/current-user.dto';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => UserDto)
export class UserResolver {
  constructor(private userService: UserService) {}

  @ResolveField(() => ID)
  id(@Parent() parent: UserDto): string {
    return parent.id.toString();
  }

  @ResolveField(() => String)
  username(@Parent() parent: UserDto): string {
    return parent.username;
  }

  @Query(() => UserDto)
  @UseGuards(AuthGuard)
  async getMyUserInfo(@CurrentUser() user: CurrentUserDto): Promise<UserDto> {
    return await this.userService.getUserById(user.userId);
  }

  @Query(() => UserDto)
  async getUserById(
    @Args('id', { type: () => ID }) id: bigint,
  ): Promise<UserDto> {
    return await this.userService.getUserById(id);
  }

  @Mutation(() => UserDto)
  @UseGuards(AuthGuard)
  async updateUser(
    @CurrentUser() user: CurrentUserDto,
    @Args('input') input: UpdateUserInput,
  ): Promise<UserDto> {
    return await this.userService.updateUser(user.userId, input);
  }
}

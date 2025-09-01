import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @ApiOperation({ summary: '유저 생성' })
  async createUser(@Body() data: CreateUserDto) {
    await this.userService.createUser(data);
    return { message: 'User 생성 완료' };
  }
}

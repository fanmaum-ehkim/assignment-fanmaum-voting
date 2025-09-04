import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequestDto } from './dto/create-user-request.dto';
import { ApiOperation } from '@nestjs/swagger';
import { CreateUserResponseDto } from './dto/create-user-response.dto';
import { plainToInstance } from 'class-transformer';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @ApiOperation({ summary: '유저 생성' })
  @UseInterceptors(ClassSerializerInterceptor)
  async createUser(
    @Body() data: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    const createdUser = await this.userService.createUser(data);
    return plainToInstance(CreateUserResponseDto, createdUser);
  }
}

import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  @ApiOperation({ summary: '유저 로그인' })
  async login(@Body() signinDto: SigninDto) {
    const user = await this.authService.validateUser(signinDto);
    const token = await this.authService.signJwtToken({id: user.id});
    return { token };
  }
}

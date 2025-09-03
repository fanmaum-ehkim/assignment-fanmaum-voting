import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { ApiForbiddenResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { TokenResponseDto } from './dto/token-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  @ApiOperation({ summary: '유저 로그인' })
  @ApiOkResponse({ description: '로그인 성공', type: TokenResponseDto })
  @ApiForbiddenResponse({ description: '로그인 실패' })
  async signin(@Body() signinDto: SigninDto): Promise<TokenResponseDto> {
    const user = await this.authService.validateUser(signinDto);
    const token = await this.authService.signJwtToken({ id: user.id });
    return { token };
  }
}

import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { TokenResponseDto } from './dto/token-response.dto';
import { TokenRefreshDto } from './dto/token-refresh.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  @ApiOperation({ summary: '유저 로그인' })
  @ApiOkResponse({ description: '로그인 성공', type: TokenResponseDto })
  @ApiForbiddenResponse({ description: '로그인 실패' })
  async signin(@Body() signinDto: SigninDto): Promise<TokenResponseDto> {
    const user = await this.authService.validateUser(signinDto);

    const accessToken = await this.authService.signAccessJwtTokenByUserId(user.id );
    const refreshToken = await this.authService.signRefreshJwtTokenByUserId(user.id);

    return { accessToken, refreshToken };
  }

  @Post('token-refresh')
  @ApiOperation({ summary: 'Access Token 재발급', description: 'Refresh Token을 이용하여 Access Token과 Refresh Token을 재발급합니다.' })
  @ApiOkResponse({ description: '재발급 성공', type: TokenResponseDto })
  @ApiUnauthorizedResponse({ description: '재발급 실패' })
  async tokenRefresh(@Body() tokenRefreshDto: TokenRefreshDto): Promise<TokenResponseDto> {
    const { refreshToken } = tokenRefreshDto;
    return this.authService.tokenRefresh(refreshToken);
  }
}

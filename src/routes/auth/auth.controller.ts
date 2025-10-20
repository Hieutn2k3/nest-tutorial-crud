import { Body, Controller, Post, SerializeOptions } from '@nestjs/common'
import { LoginBodyDTO, LoginResDTO, RegisterBodyDTO, RegisterResponseDTO } from 'src/routes/auth/auth.dto'
import { AuthService } from 'src/routes/auth/auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @SerializeOptions({ type: RegisterResponseDTO }) // áp dụng DTO cho kết quả trả ra
  @Post('register')
  async register(@Body() body: RegisterBodyDTO) {
    return await this.authService.register(body)
  }

  @Post('login')
  async login(@Body() body: LoginBodyDTO) {
    return new LoginResDTO(await this.authService.login(body))
  }
}

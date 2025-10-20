import { Body, Controller, Post, SerializeOptions } from '@nestjs/common'
import { RegisterBodyDTO, RegisterResponseDTO } from 'src/routes/auth/auth.dto'
import { AuthService } from 'src/routes/auth/auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @SerializeOptions({ type: RegisterResponseDTO }) // áp dụng DTO cho kết quả trả ra
  @Post('register')
  async register(@Body() body: RegisterBodyDTO) {
    console.log('controller ...')
    return await this.authService.register(body)
    // return new RegisterResponseDTO((await this.authService.register(body)) ?? {})
  }
}

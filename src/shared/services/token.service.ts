import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import envConfig from 'src/shared/config'
import { TokenPayload } from 'src/shared/types/jwt.type'

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}
  signAccessToken(payload: { userId: number }) {
    return this.jwtService.sign(payload, {
      secret: envConfig.ACCESS_TOKEN_SECRET,
      expiresIn: envConfig.ACCESS_TOKEN_SECRET_IN as any,
      algorithm: 'HS256',
    })
  }
  signRefreshToken(payload: { userId: number }) {
    return this.jwtService.sign(payload, {
      secret: envConfig.REFRESH_ACCESS_TOKEN_SECRET,
      expiresIn: envConfig.REFRESH_ACCESS_TOKEN_SECRET_IN as any,
      algorithm: 'HS256',
    })
  }
  verifyAccessToken(token: string): Promise<TokenPayload> {
    return this.jwtService.verifyAsync(token, {
      secret: envConfig.ACCESS_TOKEN_SECRET,
    })
  }
  verifyRefreshToken(token: string): Promise<TokenPayload> {
    return this.jwtService.verifyAsync(token, {
      secret: envConfig.REFRESH_ACCESS_TOKEN_SECRET,
    })
  }
}

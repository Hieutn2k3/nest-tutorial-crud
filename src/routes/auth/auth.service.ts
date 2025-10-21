import { ConflictException, Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common'
import { Prisma } from 'generated/prisma'
import { LoginBodyDTO } from 'src/routes/auth/auth.dto'
import { HasingService } from 'src/shared/services/hasing.service'
import { PrismaService } from 'src/shared/services/prisma.service'
import { TokenService } from 'src/shared/services/token.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly hasingService: HasingService,
    private readonly prismaService: PrismaService,
    private readonly tokenService: TokenService,
  ) {}
  async register(body: any) {
    try {
      const hashedPassword = await this.hasingService.hash(body.password)
      const user = await this.prismaService.user.create({
        data: {
          email: body.email,
          password: hashedPassword,
          name: body.name,
        },
      })
      return user
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('Email already exists')
      }
      console.log(error)
    }
  }
  async login(body: LoginBodyDTO) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: body.email,
      },
    })
    if (!user) throw new UnauthorizedException('Account is not exist')

    const isPasswordMatch = await this.hasingService.compare(body.password, user.password)
    if (!isPasswordMatch)
      throw new UnprocessableEntityException([{ field: 'password', error: 'Password is incorrect' }])

    const token = await this.genarateTokens({ userId: user.id })
    return token
  }
  async genarateTokens(payload: { userId: number }) {
    const [accessToken, refreshToken] = await Promise.all([
      this.tokenService.signAccessToken(payload),
      this.tokenService.signRefreshToken(payload),
    ])
    const decodedRefreshToken = await this.tokenService.verifyRefreshToken(refreshToken)
    await this.prismaService.refreshToken.create({
      data: {
        token: refreshToken,
        userId: payload.userId,
        expiresAt: new Date(decodedRefreshToken.exp * 1000),
      },
    })
    return { accessToken, refreshToken }
  }

  async refreshToken(resfreshToken: string) {
    // 1. Kiểm tra refreshToken có đúng hay không
    try {
      const { userId } = await this.tokenService.verifyRefreshToken(resfreshToken)
      //2. Kiểm tra refreshToken có tồn tại trong DB k
      await this.prismaService.refreshToken.findUniqueOrThrow({
        where: {
          token: resfreshToken,
        },
      })
      // 3. xóa refreshToken cũ
      await this.prismaService.refreshToken.delete({
        where: {
          token: resfreshToken,
        },
      })
      //4.Tạo mới accesToken và refreshToken
      return await this.genarateTokens({ userId })
    } catch (error) {
      // Trường hợp đã refreshToken rồi , hãy thoogn báo cho user biết
      // refreshToken đã bị đánh cắp
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new UnauthorizedException('RefreshToken has been revoked')
      }
      throw new UnauthorizedException()
    }
  }
}

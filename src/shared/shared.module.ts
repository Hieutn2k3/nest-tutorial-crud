import { Global, Module } from '@nestjs/common'
import { PrismaService } from 'src/shared/services/prisma.service'
import { HasingService } from './services/hasing.service'
import { TokenService } from './services/token.service'
import { JwtModule } from '@nestjs/jwt'

const sharedService = [PrismaService, HasingService, TokenService]

@Global() // khai báo decorater để dùng cho toàn folder
@Module({
  providers: sharedService,
  exports: sharedService,
  imports: [JwtModule],
})
export class SharedModule {}

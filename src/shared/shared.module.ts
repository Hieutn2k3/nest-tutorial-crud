import { Global, Module } from '@nestjs/common'
import { PrismaService } from 'src/shared/services/prisma.service'
import { HasingService } from './services/hasing.service'

const sharedService = [PrismaService, HasingService]

@Global() // khai báo decorater để dùng cho toàn folder
@Module({
  providers: sharedService,
  exports: sharedService,
})
export class SharedModule {}

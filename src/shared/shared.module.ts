import { Global, Module } from '@nestjs/common'
import { PrismaService } from 'src/shared/services/prisma.service'

const sharedService = [PrismaService]

@Global() // khai báo decorater để dùng cho toàn folder
@Module({
  providers: sharedService,
  exports: sharedService,
})
export class SharedModule {}

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Tự động loại bỏ các field khi không dc khai báo  decorater
      forbidNonWhitelisted: true, // Nếu field không được khai báo trong DTO thì sẽ báo lỗi
      transform: true, //TỰ động chuyển hóa dữ liệu được khai báo trong DTO
      exceptionFactory: (validationErrors) => {
        console.log(validationErrors)
        return new UnprocessableEntityException(
          validationErrors.map((error) => ({
            field: error.property,
            error: Object.values(error.constraints as any).join(','),
          })),
        )
      },
    }),
  )
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()

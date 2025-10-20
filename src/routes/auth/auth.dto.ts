import { Exclude, Expose, Type } from 'class-transformer'
import { IsString } from 'class-validator'
import { SuccessResDTO } from 'src/shared/shared.dto'

export class LoginBodyDTO {
  @IsString()
  email: string
  @IsString()
  password: string
}

export class RegisterBodyDTO extends LoginBodyDTO {
  @IsString()
  name: string
  @IsString()
  confirmPassword: string
}

class RegisterData {
  id: number
  email: string
  name: string

  // xóa các field này khỏi kết quả trả về
  @Exclude() password: string
  @Exclude() description: string
  createdAt: Date
  updatedAt: Date

  //   Thêm field vào kết quả trả về
  // @Expose() get emailName() {
  //   return this.id + this.email
  // }

  constructor(partial: Partial<RegisterData>) {
    Object.assign(this, partial)
  }
}

export class RegisterResponseDTO extends SuccessResDTO {
  @Type(() => RegisterData)
  declare data: RegisterData

  constructor(partial: Partial<RegisterResponseDTO>) {
    super(partial)
    Object.assign(this, partial)
  }
}

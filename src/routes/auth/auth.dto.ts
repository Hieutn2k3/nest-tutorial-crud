import { Exclude, Expose, Type } from 'class-transformer'
import { IsString, Length } from 'class-validator'
import { Match } from 'src/shared/decorator/custom-validator.decorator'
import { SuccessResDTO } from 'src/shared/shared.dto'

export class LoginBodyDTO {
  @IsString()
  email: string
  @IsString()
  @Length(6, 20, { message: 'Mật khẩu phải có độ dài từ 6 đến 20 kí tự !' })
  password: string
}

export class LoginResDTO {
  accessToken: string
  refreshToken: string

  constructor(data: Partial<LoginResDTO>) {
    Object.assign(this, data)
  }
}

export class RegisterBodyDTO extends LoginBodyDTO {
  @IsString()
  name: string
  @IsString()
  @Match('password')
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

export class RefreshTokenBodyDTO {
  @IsString()
  refreshToken: string
}

export class RefreshTokenResDTO extends LoginResDTO {}

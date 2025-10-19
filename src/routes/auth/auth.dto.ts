import { Exclude, Expose } from 'class-transformer'
import { IsString } from 'class-validator'

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

export class RegisterResponseDTO {
  id: number
  email: string
  name: string

  // xóa các field này khỏi kết quả trả về
  @Exclude() password: string
  @Exclude() description: string
  createdAt: Date
  updatedAt: Date

  //   Thêm field vào kết quả trả về
  @Expose() get emailName() {
    return this.id + this.email
  }

  constructor(partial: Partial<RegisterResponseDTO>) {
    Object.assign(this, partial)
  }
}

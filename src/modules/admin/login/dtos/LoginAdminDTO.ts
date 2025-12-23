import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class LoginAdminDTO {
  @ApiProperty({ example: 'teste@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'teste', minLength: 5 })
  @IsString()
  password: string;
}

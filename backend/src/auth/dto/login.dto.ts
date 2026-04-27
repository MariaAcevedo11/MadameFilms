// Author: María Acevedo

// External imports
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsString({ message: 'Email must be text.' })
  @IsNotEmpty({ message: 'Email is required.' })
  email: string;

  @IsString({ message: 'Password must be text.' })
  @IsNotEmpty({ message: 'Password is required.' })
  password: string;
}

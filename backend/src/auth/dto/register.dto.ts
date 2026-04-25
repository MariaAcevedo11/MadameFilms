import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
} from 'class-validator';

export class RegisterDto {
  @IsString({ message: 'Username must be text.' })
  @IsNotEmpty({ message: 'Username is required.' })
  @MinLength(3, { message: 'Username must be at least 3 characters long.' })
  @MaxLength(50, { message: 'Username must be at most 50 characters long.' })
  username: string;

  @IsString({ message: 'Email must be text.' })
  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail({}, { message: 'Email format is invalid.' })
  @MaxLength(100, { message: 'Email must be at most 100 characters long.' })
  email: string;

  @IsString({ message: 'Password must be text.' })
  @IsNotEmpty({ message: 'Password is required.' })
  @MinLength(3, { message: 'Password must be at least 3 characters long.' })
  password: string;

  @IsString({ message: 'Image must be text.' })
  @IsNotEmpty({ message: 'Image is required.' })
  image: string;

  @IsString({ message: 'Role must be text.' })
  @IsNotEmpty({ message: 'Role is required.' })
  role: string;
}

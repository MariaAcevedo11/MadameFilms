import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Username must be text.' })
  @IsNotEmpty({ message: 'Username is required.' })
  @MinLength(3, { message: 'Username must be at least 3 characters long.' })
  @MaxLength(50, { message: 'Username must be at most 50 characters long.' })
  username: string;

  @IsString({ message: 'Role must be text.' })
  @IsNotEmpty({ message: 'Role is required.' })
  @MinLength(3, { message: 'Role must be at least 3 characters long.' })
  @MaxLength(20, { message: 'Role must be at most 20 characters long.' })
  role: string;

  @IsString({ message: 'Email must be text.' })
  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail({}, { message: 'Email format is invalid.' })
  @MaxLength(100, { message: 'Email must be at most 100 characters long.' })
  email: string;

  @IsString({ message: 'Password must be text.' })
  @IsNotEmpty({ message: 'Password is required.' })
  @MinLength(3, { message: 'Password must be at least 3 characters long.' })
  password: string;

  @IsString({ message: 'Image must be text (URL or path).' })
  @IsNotEmpty({ message: 'Image is required.' })
  image: string;
}

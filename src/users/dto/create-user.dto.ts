import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Length, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ default: "john@yopmail.com" })
    @IsEmail({}, { message: 'Email must be an valid email address' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string;
  
    @ApiProperty()
    @Length(8, 20, { message: 'Password must be between 8 and 20 characters long' })
    @IsNotEmpty({ message: 'password is required' })
    @IsStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1
    })
    @IsString()
    password: string;
}

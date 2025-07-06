import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsInt,
  IsDateString,
  IsStrongPassword,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class CreateUserDto {
  @ApiProperty({ example: "Jane Doe", description: "Full name of the user" })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  full_name: string;

  @ApiProperty({
    example: "janedoe",
    description: "Login username of the user",
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  @MaxLength(50)
  login: string;

  @ApiProperty({
    example: "newpassword456",
    description: "Hashed password of the user",
  })
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 2,
    description: "ID of the role assigned to the user",
  })
  @IsInt()
  @IsNotEmpty()
  role_id: number;
}

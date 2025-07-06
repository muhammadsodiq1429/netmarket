import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Matches,
} from "class-validator";

export class UpdateUserPasswordDto {
  @ApiProperty({ type: "string", example: "Abdulloh20-00" })
  @IsString()
  @IsNotEmpty()
  current_password: string;

  @ApiProperty({ type: "string", example: "Abdulloh20-00" })
  @IsStrongPassword()
  @IsNotEmpty()
  new_password: string;

  @ApiProperty({ type: "string", example: "Abdulloh20-00" })
  @IsString()
  @IsNotEmpty()
  confirm_password: string;
}

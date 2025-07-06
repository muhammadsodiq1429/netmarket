import { IsString, IsNotEmpty, MaxLength, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class CreateCategoryDto {
  @ApiProperty({
    example: "Home Appliances",
    description: "Name of the category",
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  name: string;

  @ApiProperty({
    example: "Large and small appliances for home use",
    description: "Description of the category",
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}

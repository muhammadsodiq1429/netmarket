import { IsInt, IsNotEmpty, IsNumber, Min, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSaleDto {
  @ApiProperty({ example: 1, description: 'ID of the user who made the sale' })
  @IsInt()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({ example: 1, description: 'ID of the customer for the sale (optional)', required: false })
  @IsInt()
  @IsOptional()
  customer_id?: number;

  @ApiProperty({ example: 1250.50, description: 'Total amount of the sale' })
  @IsNumber()
  @Min(0)
  total_amount: number;
}
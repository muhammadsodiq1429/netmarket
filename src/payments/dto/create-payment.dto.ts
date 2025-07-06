import { IsInt, IsNotEmpty, IsString, MaxLength, IsNumber, Min, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({ example: 1, description: 'ID of the sale this payment belongs to' })
  @IsInt()
  @IsNotEmpty()
  sale_id: number;

  @ApiProperty({ example: 'Card', description: 'Type of payment (e.g., Cash, Card, Installment)' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  payment_type: string;

  @ApiProperty({ example: 1200.00, description: 'Amount of the payment' })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  amount: number;
}
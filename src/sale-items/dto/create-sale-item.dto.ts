import { IsInt, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSaleItemDto {
  @ApiProperty({ example: 1, description: 'ID of the sale this item belongs to' })
  @IsInt()
  @IsNotEmpty()
  sale_id: number;

  @ApiProperty({ example: 1, description: 'ID of the product sold' })
  @IsInt()
  @IsNotEmpty()
  product_id: number;

  @ApiProperty({ example: 1, description: 'Quantity of the product sold' })
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  quantity: number;

  @ApiProperty({ example: 450.00, description: 'Price per unit at the time of sale' })
  @IsNumber()
  @IsNotEmpty()
  price_per_unit: number;
}
import { IsString, IsNotEmpty, MaxLength, IsOptional, IsNumber, IsInt, Min, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'LG Refrigerator', description: 'Name of the product' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty({ example: 'REF-LG-FROST-FREE', description: 'SKU or article number of the product', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  sku?: string;

  @ApiProperty({ example: '300L Frost-Free Double Door Refrigerator', description: 'Description of the product', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 800.00, description: 'Cost price of the product' })
  @IsNumber()
  @Min(0)
  cost_price: number;

  @ApiProperty({ example: 1000.00, description: 'Selling price of the product' })
  @IsNumber()
  @Min(0)
  selling_price: number;

  @ApiProperty({ example: 20, description: 'Quantity of the product currently in stock' })
  @IsInt()
  @Min(0)
  quantity_on_hand: number;

  @ApiProperty({ example: 'Warehouse B, Aisle 1', description: 'Physical location of the product in storage', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  location?: string;

  @ApiProperty({ example: 2, description: 'ID of the category the product belongs to', required: false })
  @IsInt()
  @IsOptional()
  category_id: number;
}
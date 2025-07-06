import { IsInt, IsNotEmpty, IsString, MaxLength, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInventoryLogDto {
  @ApiProperty({ example: 1, description: 'ID of the product affected by the log entry' })
  @IsInt()
  @IsNotEmpty()
  product_id: number;

  @ApiProperty({ example: 1, description: 'ID of the user who made the change' })
  @IsInt()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({ example: 'Incoming', description: 'Type of change (e.g., Incoming, Sale, Return, Write-off)' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  change_type: string;

  @ApiProperty({ example: 10, description: 'Quantity change (positive for incoming, negative for outgoing)' })
  @IsInt()
  @IsNotEmpty()
  quantity_change: number;

  @ApiProperty({ example: 'New stock delivery', description: 'Reason for the inventory change', required: false })
  @IsString()
  @IsOptional()
  reason?: string;
}
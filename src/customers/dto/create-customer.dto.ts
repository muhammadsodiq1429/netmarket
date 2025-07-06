import { IsString, IsNotEmpty, MaxLength, IsOptional, IsPhoneNumber, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({ example: 'Bob Johnson', description: 'Full name of the customer' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  full_name: string;

  @ApiProperty({ example: '+998917654321', description: 'Phone number of the customer', required: false })
  @IsString()
  @IsOptional()
  @IsPhoneNumber('UZ')
  @MaxLength(20)
  phone_number?: string;
}
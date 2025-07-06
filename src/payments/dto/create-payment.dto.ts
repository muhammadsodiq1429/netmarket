import {
  IsInt,
  IsNotEmpty,
  MaxLength,
  IsNumber,
  Min,
  IsEnum,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { PaymentTypeEnum } from "../../common/enums/payment-type.enum";
import { Transform } from "class-transformer";

export class CreatePaymentDto {
  @ApiProperty({
    example: 1,
    description: "ID of the sale this payment belongs to",
  })
  @IsInt()
  @IsNotEmpty()
  sale_id: number;

  @ApiProperty({
    example: "Card",
    description: "Type of payment (e.g., Cash, Card, Installment)",
  })
  @IsEnum(PaymentTypeEnum)
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  payment_type: string;

  @ApiProperty({ example: 1200.0, description: "Amount of the payment" })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  amount: number;
}

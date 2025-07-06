import { PartialType } from '@nestjs/swagger';
import { CreateSaleItemDto } from './create-sale-item.dto';

export class UpdateSaleItemDto extends PartialType(CreateSaleItemDto) {}
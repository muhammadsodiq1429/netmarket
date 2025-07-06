import { PartialType } from '@nestjs/swagger';
import { CreateInventoryLogDto } from './create-inventory-log.dto';

export class UpdateInventoryLogDto extends PartialType(CreateInventoryLogDto) {}
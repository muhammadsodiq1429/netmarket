import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryLogsService } from './inventory-logs.service';
import { InventoryLogsController } from './inventory-logs.controller';
import { InventoryLog } from './entities/inventory-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InventoryLog])],
  controllers: [InventoryLogsController],
  providers: [InventoryLogsService],
})
export class InventoryLogsModule {}

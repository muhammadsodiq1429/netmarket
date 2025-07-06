import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InventoryLogsService } from "./inventory-logs.service";
import { InventoryLogsController } from "./inventory-logs.controller";
import { InventoryLog } from "./entities/inventory-log.entity";
import { ProductsModule } from "../products/products.module";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([InventoryLog]),
    ProductsModule,
    UsersModule,
  ],
  controllers: [InventoryLogsController],
  providers: [InventoryLogsService],
})
export class InventoryLogsModule {}

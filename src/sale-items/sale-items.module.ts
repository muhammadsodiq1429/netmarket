import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SaleItemsService } from "./sale-items.service";
import { SaleItemsController } from "./sale-items.controller";
import { SaleItem } from "./entities/sale-item.entity";
import { SalesService } from "../sales/sales.service";
import { SalesModule } from "../sales/sales.module";
import { ProductsModule } from "../products/products.module";

@Module({
  imports: [TypeOrmModule.forFeature([SaleItem]), SalesModule, ProductsModule],
  controllers: [SaleItemsController],
  providers: [SaleItemsService],
})
export class SaleItemsModule {}

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SalesService } from "./sales.service";
import { SalesController } from "./sales.controller";
import { Sale } from "./entities/sale.entity";
import { CustomersModule } from "../customers/customers.module";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [TypeOrmModule.forFeature([Sale]), CustomersModule, UsersModule],
  controllers: [SalesController],
  providers: [SalesService],
  exports: [SalesService],
})
export class SalesModule {}

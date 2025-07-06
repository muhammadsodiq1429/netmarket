import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PaymentsService } from "./payments.service";
import { PaymentsController } from "./payments.controller";
import { Payment } from "./entities/payment.entity";
import { SalesModule } from "../sales/sales.module";

@Module({
  imports: [TypeOrmModule.forFeature([Payment]), SalesModule],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}

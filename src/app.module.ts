import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { RolesModule } from "./roles/roles.module";
import { UsersModule } from "./users/users.module";
import { CustomersModule } from "./customers/customers.module";
import { CategoriesModule } from "./categories/categories.module";
import { ProductsModule } from "./products/products.module";
import { SalesModule } from "./sales/sales.module";
import { SaleItemsModule } from "./sale-items/sale-items.module";
import { PaymentsModule } from "./payments/payments.module";
import { InventoryLogsModule } from "./inventory-logs/inventory-logs.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("DB_HOST"),
        port: configService.get<number>("DB_PORT"),
        username: configService.get<string>("DB_USERNAME"),
        password: configService.get<string>("DB_PASSWORD"),
        database: configService.get<string>("DB_DATABASE"),
        entities: [__dirname + "/**/*.entity{.ts,.js}"],
        synchronize: configService.get<boolean>("DB_SYNCHRONIZE"),
        // dropSchema: true,
      }),
      inject: [ConfigService],
    }),
    RolesModule,
    UsersModule,
    CustomersModule,
    CategoriesModule,
    ProductsModule,
    SalesModule,
    SaleItemsModule,
    PaymentsModule,
    InventoryLogsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

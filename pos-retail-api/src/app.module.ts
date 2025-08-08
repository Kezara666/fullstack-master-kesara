import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QtyTypeModule } from './inventory-management/qty-type/qty-type.module';
import { SupplierModule } from './item-management/supplier/supplier.module';
import { ProductsModule } from './item-management/products/products.module';
import { QtyModule } from './inventory-management/qty/qty.module';
import { ItemSellModule } from './sale-management/item-sell/item-sell.module';
import { InvoiceModule } from './sale-management/invoice/invoice.module';
import { CustomerModule } from './sale-management/customer/customer.module';
import { ProductPriceModule } from './item-management/product-prices/product-prices.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ShopModule } from './shop-management/shop/shop.module';
import { UserModule } from './shop-management/user/user.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  imports: [
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'mysql',
    //     charset: 'utf8mb4',
    //     host: configService.get('DB_HOST', '127.0.0.1'),
    //     port: +configService.get('DB_PORT', 3306),
    //     username: configService.get('DB_USERNAME', 'nimbwsmp_kesara'),
    //     password: configService.get('DB_PASSWORD', 'Payroll@1234'),
    //     database: configService.get('DB_DATABASE', 'nimbwsmp_pos'),
    //     entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //     synchronize: configService.get('DB_SYNCHRONIZE', true),
    //   }),
    // }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    TypeOrmModule.forRoot({
      type: 'mysql', // Database type
      host: 'mysql', // MySQL server host
      port: 3306, // MySQL server port
      username: 'root', // MySQL username
      charset: 'utf8mb4',
      password: 'yourpassword', // MySQL password
      database: 'pos', // Database name
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Entity files
      synchronize: true, // Automatically sync database schema (not recommended for production)
      logging: true, // Enable logging for debugging
    }),


    // TypeOrmModule.forRoot({
    //   type: 'sqlite', // Switch to SQLite
    //   database: ':memory:', // In-memory database
    //   entities: [__dirname + '/**/*.entity{.ts,.js}'], // Same entity files
    //   synchronize: true, // Auto-create tables (safe for in-memory)
    //   logging: true, // Enable logging for debugging
    // }),
    QtyTypeModule,
    SupplierModule,
    ProductsModule,
    ProductPriceModule,
    QtyModule,
    ItemSellModule,
    InvoiceModule,
    CustomerModule,
    ShopModule,
    UserModule

  ],

  controllers: [AppController],
  providers: [AppService,],

})
export class AppModule { }

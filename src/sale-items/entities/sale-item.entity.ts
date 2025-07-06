import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Sale } from '../../sales/entities/sale.entity';
import { Product } from '../../products/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/base.entity';

@Entity('sale_items')
export class SaleItem extends BaseEntity {
  @ApiProperty({ example: 1, description: 'ID of the sale this item belongs to' })
  @Column({ type: 'int', nullable: false })
  sale_id: number;

  @ManyToOne(() => Sale)
  @JoinColumn({ name: 'sale_id' })
  sale: Sale;

  @ApiProperty({ example: 1, description: 'ID of the product sold' })
  @Column({ type: 'int', nullable: false })
  product_id: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ApiProperty({ example: 2, description: 'Quantity of the product sold' })
  @Column({ type: 'int', nullable: false })
  quantity: number;

  @ApiProperty({ example: 500.00, description: 'Price per unit at the time of sale' })
  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: false })
  price_per_unit: number;
}
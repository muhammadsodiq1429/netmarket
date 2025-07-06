import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/base.entity';

@Entity('products')
export class Product extends BaseEntity {
  @ApiProperty({ example: 'Samsung Smart TV', description: 'Name of the product' })
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @ApiProperty({ example: 'TV-SAMSUNG-QLED-55', description: 'SKU or article number of the product', nullable: true })
  @Column({ type: 'varchar', length: 100, unique: true, nullable: true })
  sku: string;

  @ApiProperty({ example: '55-inch QLED 4K Smart TV with HDR', description: 'Description of the product', nullable: true })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({ example: 1200.00, description: 'Cost price of the product' })
  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: false })
  cost_price: number;

  @ApiProperty({ example: 1500.00, description: 'Selling price of the product' })
  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: false })
  selling_price: number;

  @ApiProperty({ example: 50, description: 'Quantity of the product currently in stock' })
  @Column({ type: 'int', default: 0, nullable: false })
  quantity_on_hand: number;

  @ApiProperty({ example: 'Warehouse A, Shelf 3', description: 'Physical location of the product in storage', nullable: true })
  @Column({ type: 'varchar', length: 255, nullable: true })
  location: string;

  @ApiProperty({ example: 1, description: 'ID of the category the product belongs to', nullable: true })
  @Column({ type: 'int', nullable: true })
  category_id: number;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
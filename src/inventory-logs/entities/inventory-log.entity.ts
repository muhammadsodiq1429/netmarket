import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/base.entity';

@Entity('inventory_logs')
export class InventoryLog extends BaseEntity {
  @ApiProperty({ example: 1, description: 'ID of the product affected by the log entry' })
  @Column({ type: 'int', nullable: false })
  product_id: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ApiProperty({ example: 1, description: 'ID of the user who made the change' })
  @Column({ type: 'int', nullable: false })
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ApiProperty({ example: 'Sale', description: 'Type of change (e.g., Incoming, Sale, Return, Write-off)' })
  @Column({ type: 'varchar', length: 50, nullable: false })
  change_type: string;

  @ApiProperty({ example: -5, description: 'Quantity change (positive for incoming, negative for outgoing)' })
  @Column({ type: 'int', nullable: false })
  quantity_change: number;

  @ApiProperty({ example: 'Customer purchase', description: 'Reason for the inventory change', nullable: true })
  @Column({ type: 'text', nullable: true })
  reason: string;
}
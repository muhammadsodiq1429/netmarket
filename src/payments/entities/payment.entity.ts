import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Sale } from '../../sales/entities/sale.entity';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/base.entity';

@Entity('payments')
export class Payment extends BaseEntity {
  @ApiProperty({ example: 1, description: 'ID of the sale this payment belongs to' })
  @Column({ type: 'int', nullable: false })
  sale_id: number;

  @ManyToOne(() => Sale)
  @JoinColumn({ name: 'sale_id' })
  sale: Sale;

  @ApiProperty({ example: 'Cash', description: 'Type of payment (e.g., Cash, Card, Installment)' })
  @Column({ type: 'varchar', length: 50, nullable: false })
  payment_type: string;

  @ApiProperty({ example: 1500.00, description: 'Amount of the payment' })
  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: false })
  amount: number;
}
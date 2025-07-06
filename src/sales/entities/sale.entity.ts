import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Customer } from '../../customers/entities/customer.entity';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/base.entity';

@Entity('sales')
export class Sale extends BaseEntity {
  @ApiProperty({ example: 1, description: 'ID of the user who made the sale' })
  @Column({ type: 'int', nullable: false })
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ApiProperty({ example: 1, description: 'ID of the customer for the sale (optional)', nullable: true })
  @Column({ type: 'int', nullable: true })
  customer_id: number;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @ApiProperty({ example: 1500.00, description: 'Total amount of the sale' })
  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: false })
  total_amount: number;
}
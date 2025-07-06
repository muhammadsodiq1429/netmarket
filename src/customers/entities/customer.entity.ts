import { Entity, Column } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "../../common/base.entity";

@Entity("customers")
export class Customer extends BaseEntity {
  @ApiProperty({
    example: "Alice Smith",
    description: "Full name of the customer",
  })
  @Column({ type: "varchar", length: 100, nullable: false })
  full_name: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Phone number of the customer",
    nullable: true,
  })
  @Column({ type: "varchar", length: 20, nullable: true })
  phone_number: string;
}

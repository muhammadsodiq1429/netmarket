import { Entity, Column } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "../../common/base.entity";

@Entity("categories")
export class Category extends BaseEntity {
  @ApiProperty({ example: "Electronics", description: "Name of the category" })
  @Column({ type: "varchar", length: 100, unique: true, nullable: false })
  name: string;

  @ApiProperty({
    example: "Electronic devices and gadgets",
    description: "Description of the category",
    nullable: true,
  })
  @Column({ type: "text", nullable: true })
  description: string;
}

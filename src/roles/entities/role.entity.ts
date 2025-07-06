import { Entity, Column, OneToMany } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "../../common/base.entity";
import { User } from "../../users/entities/user.entity";

@Entity("roles")
export class Role extends BaseEntity {
  @ApiProperty({ example: "Administrator", description: "Name of the role" })
  @Column({ type: "varchar", length: 50, unique: true, nullable: false })
  name: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}

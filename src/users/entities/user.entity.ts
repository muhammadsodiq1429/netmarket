import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Role } from "../../roles/entities/role.entity";
import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "../../common/base.entity";

@Entity("users")
export class User extends BaseEntity {
  @ApiProperty({ example: "John Doe", description: "Full name of the user" })
  @Column({ type: "varchar", length: 100, nullable: false })
  full_name: string;

  @ApiProperty({
    example: "johndoe",
    description: "Login username of the user",
  })
  @Column({ type: "varchar", length: 50, unique: true, nullable: false })
  login: string;

  @ApiProperty({
    example: "hashedpassword123",
    description: "Hashed password of the user",
  })
  @Column({ type: "varchar", length: 255, nullable: false })
  password_hash: string;

  @ApiProperty({
    example: 1,
    description: "ID of the role assigned to the user",
  })
  @Column({ type: "int", nullable: false })
  role_id: number;

  @ManyToOne(() => Role, (role) => role.users, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "role_id" })
  role: Role;
}

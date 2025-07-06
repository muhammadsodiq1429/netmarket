import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

export class BaseEntity {
  @ApiProperty({ example: 1, description: "Unique identifier" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "2023-07-05T10:00:00Z", description: "Timestamp when the entity was created" })
  @CreateDateColumn({ type: "timestamptz" })
  created_at: Date;

  @ApiProperty({ example: "2023-07-05T10:00:00Z", description: "Timestamp when the entity was last updated" })
  @UpdateDateColumn({ type: "timestamptz" })
  updated_at: Date;
}

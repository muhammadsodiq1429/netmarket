import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { Role } from "./entities/role.entity";

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const existingRole = await this.rolesRepository.findOne({
      where: { name: createRoleDto.name },
    });
    if (existingRole) {
      throw new ConflictException(
        `Role with name "${createRoleDto.name}" already exists.`
      );
    }

    return this.rolesRepository.save(createRoleDto);
  }

  async findAll() {
    const roles = await this.rolesRepository.find({
      relations: { users: true },
      order: { id: "ASC" },
    });
    if (roles.length === 0) {
      throw new NotFoundException("No roles found.");
    }

    return roles;
  }

  async findOne(id: number) {
    const role = await this.rolesRepository.findOne({
      where: { id },
      relations: { users: true },
    });
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found.`);
    }
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.findOne(id);
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found.`);
    }
    if (updateRoleDto.name && updateRoleDto.name !== role.name) {
      const existingRole = await this.rolesRepository.findOne({
        where: { name: updateRoleDto.name },
      });
      if (existingRole) {
        throw new ConflictException(
          `Role with name "${updateRoleDto.name}" already exists.`
        );
      }
    }
    const updatedRole = await this.rolesRepository.preload({
      id,
      ...updateRoleDto,
    });
    return this.rolesRepository.save(updatedRole!);
  }

  async remove(id: number) {
    const role = await this.findOne(id);
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found.`);
    }
    await this.rolesRepository.delete(id);
    return role;
  }
}

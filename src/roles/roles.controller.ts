import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Role } from "./entities/role.entity";

@ApiTags("roles")
@Controller("roles")
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiOperation({ summary: "Create a new role" })
  @ApiResponse({
    status: 201,
    description: "The role has been successfully created.",
    type: Role,
  })
  @ApiResponse({
    status: 409,
    description: 'Role with name "${createRoleDto.name}" already exists.',
  })
  @ApiResponse({ status: 400, description: "Bad Request." })
  async create(@Body() createRoleDto: CreateRoleDto) {
    const newRole = await this.rolesService.create(createRoleDto);
    return { statusCode: 201, message: "Role created successfully", newRole };
  }

  @Get()
  @ApiOperation({ summary: "Get all roles" })
  @ApiResponse({ status: 200, description: "Return all roles.", type: [Role] })
  @ApiResponse({ status: 404, description: "No roles found." })
  async findAll() {
    const roles = await this.rolesService.findAll();
    return { statusCode: 200, message: "Roles retrieved successfully", roles };
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a role by ID" })
  @ApiResponse({
    status: 200,
    description: "Return a single role.",
    type: Role,
  })
  @ApiResponse({ status: 404, description: "Role not found." })
  async findOne(@Param("id", ParseIntPipe) id: number) {
    const role = await this.rolesService.findOne(id);
    return { statusCode: 200, message: "Role retrieved successfully", role };
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a role by ID" })
  @ApiResponse({
    status: 200,
    description: "The role has been successfully updated.",
    type: Role,
  })
  @ApiResponse({ status: 404, description: "Role not found." })
  @ApiResponse({ status: 400, description: "Bad Request." })
  @ApiResponse({
    status: 409,
    description: 'Role with name "${createRoleDto.name}" already exists.',
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateRoleDto: UpdateRoleDto
  ) {
    const updatedRole = await this.rolesService.update(id, updateRoleDto);
    return { statusCode: 200, message: "Role updated successfully", updatedRole };
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a role by ID" })
  @ApiResponse({
    status: 200,
    description: "The role has been successfully deleted.",
    type: Role,
  })
  @ApiResponse({ status: 404, description: "Role not found." })
  async remove(@Param("id", ParseIntPipe) id: number) {
    const deletedRole = await this.rolesService.remove(id);
    return { statusCode: 200, message: "Role deleted successfully", deletedRole };
  }
}

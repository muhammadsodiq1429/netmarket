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
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { User } from "./entities/user.entity";
import { UpdateUserPasswordDto } from "./dto/update-user-password.dto";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: "Create a new user" })
  @ApiResponse({
    status: 201,
    description: "The user has been successfully created.",
    type: User,
  })
  @ApiResponse({ status: 400, description: "Bad Request." })
  @ApiResponse({
    status: 409,
    description: 'User with login "${createUserDto.login}" already exists.',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: 200, description: "Return all users.", type: [User] })
  @ApiResponse({ status: 404, description: "No users found." })
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a user by ID" })
  @ApiResponse({
    status: 200,
    description: "Return a single user.",
    type: User,
  })
  @ApiResponse({ status: 404, description: "User not found." })
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a user by ID" })
  @ApiResponse({
    status: 200,
    description: "The user has been successfully updated.",
    type: User,
  })
  @ApiResponse({ status: 404, description: "User not found." })
  @ApiResponse({ status: 400, description: "Bad Request." })
  @ApiResponse({
    status: 409,
    description: 'User with login "${createUserDto.login}" already exists.',
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: "Reset a user password" })
  @ApiResponse({
    status: 200,
    description: "User password reseted successfully",
  })
  @ApiResponse({ status: 400, description: "Current password is not correct" })
  @ApiResponse({
    status: 400,
    description: "New password and confirm password do not match",
  })
  @Patch(":id/update-password")
  async updatePassword(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto
  ) {
    return this.usersService.updatePassword(id, updateUserPasswordDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a user by ID" })
  @ApiResponse({
    status: 200,
    description: "The user has been successfully deleted.",
    type: User,
  })
  @ApiResponse({ status: 404, description: "User not found." })
  async remove(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}

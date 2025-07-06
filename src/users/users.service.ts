import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { RolesService } from "../roles/roles.service";
import { UpdateUserPasswordDto } from "./dto/update-user-password.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly rolesService: RolesService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.findOne({
      where: { login: createUserDto.login },
    });
    if (existingUser)
      throw new ConflictException(
        `User with login "${createUserDto.login}" already exists.`
      );
    await this.rolesService.findOne(createUserDto.role_id);
    const newUser = await this.usersRepository.save({
      ...createUserDto,
      password_hash: await bcrypt.hash(createUserDto.password, 7),
    });

    return { statusCode: 201, message: "User created successfully", newUser };
  }

  async findAll() {
    const allUsers = await this.usersRepository.find({
      relations: { role: true },
      order: { id: "ASC" },
    });
    if (allUsers.length === 0) {
      throw new NotFoundException("No users found.");
    }
    return { statusCode: 200, allUsers };
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: { role: true },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return { statusCode: 200, user };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    if (updateUserDto.login && updateUserDto.login !== user.login) {
      const existingUser = await this.usersRepository.findOne({
        where: { login: updateUserDto.login },
      });
      if (existingUser) {
        throw new ConflictException(
          `User with login "${updateUserDto.login}" already exists.`
        );
      }
    }
    if (updateUserDto.role_id) {
      await this.rolesService.findOne(updateUserDto.role_id);
    }
    await this.usersRepository.update(id, updateUserDto);

    return {
      statusCode: 200,
      message: "User updated successfully",
      updatedUserId: id,
    };
  }

  async updatePassword(
    id: number,
    updateUserPasswordDto: UpdateUserPasswordDto
  ) {
    const { user } = await this.findOne(id);
    const { current_password, new_password, confirm_password } =
      updateUserPasswordDto;

    if (!(await bcrypt.compare(current_password, user.password_hash)))
      throw new BadRequestException("Current password is not correct");

    if (new_password !== confirm_password)
      throw new BadRequestException(
        "New password and confirm password do not match"
      );
    await this.usersRepository.save({
      ...user,
      password_hash: await bcrypt.hash(new_password, 7),
    });
    return {
      statusCode: 200,
      message: "User password updated successfully",
      userId: id,
    };
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.usersRepository.delete(id);

    return {
      statusCode: 200,
      message: "User deleted successfully",
      deletedUserId: id,
    };
  }
}

import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateSaleDto } from "./dto/create-sale.dto";
import { UpdateSaleDto } from "./dto/update-sale.dto";
import { Sale } from "./entities/sale.entity";
import { UsersService } from "../users/users.service";
import { CustomersService } from "../customers/customers.service";

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private salesRepository: Repository<Sale>,
    private readonly usersService: UsersService,
    private readonly customersService: CustomersService
  ) {}

  async create(createSaleDto: CreateSaleDto) {
    const { user_id, customer_id } = createSaleDto;
    await this.usersService.findOne(user_id);
    if (customer_id) await this.customersService.findOne(customer_id);
    const sale = this.salesRepository.create(createSaleDto);

    return this.salesRepository.save(sale);
  }

  async findAll() {
    const sales = await this.salesRepository.find();
    if (sales.length === 0) {
      throw new NotFoundException("No sales found.");
    }
    return sales;
  }

  async findOne(id: number) {
    const sale = await this.salesRepository.findOneBy({ id });
    if (!sale) {
      throw new NotFoundException(`Sale with ID ${id} not found.`);
    }
    return sale;
  }

  async update(id: number, updateSaleDto: UpdateSaleDto) {
    const sale = await this.salesRepository.findOneBy({ id });
    if (!sale) {
      throw new NotFoundException(`Sale with ID ${id} not found.`);
    }
    const { customer_id, user_id } = updateSaleDto;
    if (customer_id) await this.customersService.findOne(customer_id);
    if (user_id) await this.usersService.findOne(user_id);

    await this.salesRepository.update(id, updateSaleDto);
    return this.salesRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const sale = await this.salesRepository.findOneBy({ id });
    if (!sale) {
      throw new NotFoundException(`Sale with ID ${id} not found.`);
    }
    await this.salesRepository.delete(id);
    return sale;
  }
}

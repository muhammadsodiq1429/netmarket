import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    if (createCustomerDto.phone_number) {
      const existingCustomer = await this.customersRepository.findOne({ where: { phone_number: createCustomerDto.phone_number } });
      if (existingCustomer) {
        throw new ConflictException(`Customer with phone number "${createCustomerDto.phone_number}" already exists.`);
      }
    }
    const customer = this.customersRepository.create(createCustomerDto);
    return this.customersRepository.save(customer);
  }

  async findAll() {
    const customers = await this.customersRepository.find();
    if (customers.length === 0) {
      throw new NotFoundException('No customers found.');
    }
    return customers;
  }

  async findOne(id: number) {
    const customer = await this.customersRepository.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found.`);
    }
    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.customersRepository.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found.`);
    }
    if (updateCustomerDto.phone_number && updateCustomerDto.phone_number !== customer.phone_number) {
      const existingCustomer = await this.customersRepository.findOne({ where: { phone_number: updateCustomerDto.phone_number } });
      if (existingCustomer) {
        throw new ConflictException(`Customer with phone number "${updateCustomerDto.phone_number}" already exists.`);
      }
    }
    await this.customersRepository.update(id, updateCustomerDto);
    return this.customersRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const customer = await this.customersRepository.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found.`);
    }
    await this.customersRepository.delete(id);
    return customer;
  }
}
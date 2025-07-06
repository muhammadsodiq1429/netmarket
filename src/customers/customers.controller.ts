import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Customer } from './entities/customer.entity';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new customer' })
  @ApiResponse({ status: 201, description: 'The customer has been successfully created.', type: Customer })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    const newCustomer = await this.customersService.create(createCustomerDto);
    return { statusCode: 201, message: "Customer created successfully", newCustomer };
  }

  @Get()
  @ApiOperation({ summary: 'Get all customers' })
  @ApiResponse({ status: 200, description: 'Return all customers.', type: [Customer] })
  async findAll() {
    const customers = await this.customersService.findAll();
    return { statusCode: 200, message: "Customers retrieved successfully", customers };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a customer by ID' })
  @ApiResponse({ status: 200, description: 'Return a single customer.', type: Customer })
  @ApiResponse({ status: 404, description: 'Customer not found.' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const customer = await this.customersService.findOne(id);
    return { statusCode: 200, message: "Customer retrieved successfully", customer };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a customer by ID' })
  @ApiResponse({ status: 200, description: 'The customer has been successfully updated.', type: Customer })
  @ApiResponse({ status: 404, description: 'Customer not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateCustomerDto: UpdateCustomerDto) {
    const updatedCustomer = await this.customersService.update(id, updateCustomerDto);
    return { statusCode: 200, message: "Customer updated successfully", updatedCustomer };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a customer by ID' })
  @ApiResponse({ status: 200, description: 'The customer has been successfully deleted.', type: Customer })
  @ApiResponse({ status: 404, description: 'Customer not found.' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const deletedCustomer = await this.customersService.remove(id);
    return { statusCode: 200, message: "Customer deleted successfully", deletedCustomer };
  }
}
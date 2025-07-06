import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Sale } from './entities/sale.entity';

@ApiTags('sales')
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new sale' })
  @ApiResponse({ status: 201, description: 'The sale has been successfully created.', type: Sale })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createSaleDto: CreateSaleDto) {
    const newSale = await this.salesService.create(createSaleDto);
    return { statusCode: 201, message: "Sale created successfully", newSale };
  }

  @Get()
  @ApiOperation({ summary: 'Get all sales' })
  @ApiResponse({ status: 200, description: 'Return all sales.', type: [Sale] })
  async findAll() {
    const sales = await this.salesService.findAll();
    return { statusCode: 200, message: "Sales retrieved successfully", sales };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a sale by ID' })
  @ApiResponse({ status: 200, description: 'Return a single sale.', type: Sale })
  @ApiResponse({ status: 404, description: 'Sale not found.' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const sale = await this.salesService.findOne(id);
    return { statusCode: 200, message: "Sale retrieved successfully", sale };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a sale by ID' })
  @ApiResponse({ status: 200, description: 'The sale has been successfully updated.', type: Sale })
  @ApiResponse({ status: 404, description: 'Sale not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateSaleDto: UpdateSaleDto) {
    const updatedSale = await this.salesService.update(id, updateSaleDto);
    return { statusCode: 200, message: "Sale updated successfully", updatedSale };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a sale by ID' })
  @ApiResponse({ status: 200, description: 'The sale has been successfully deleted.', type: Sale })
  @ApiResponse({ status: 404, description: 'Sale not found.' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const deletedSale = await this.salesService.remove(id);
    return { statusCode: 200, message: "Sale deleted successfully", deletedSale };
  }
}
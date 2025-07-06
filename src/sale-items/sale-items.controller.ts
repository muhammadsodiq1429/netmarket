import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { SaleItemsService } from './sale-items.service';
import { CreateSaleItemDto } from './dto/create-sale-item.dto';
import { UpdateSaleItemDto } from './dto/update-sale-item.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SaleItem } from './entities/sale-item.entity';

@ApiTags('sale-items')
@Controller('sale-items')
export class SaleItemsController {
  constructor(private readonly saleItemsService: SaleItemsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new sale item' })
  @ApiResponse({ status: 201, description: 'The sale item has been successfully created.', type: SaleItem })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createSaleItemDto: CreateSaleItemDto) {
    const newSaleItem = await this.saleItemsService.create(createSaleItemDto);
    return { statusCode: 201, message: "Sale item created successfully", newSaleItem };
  }

  @Get()
  @ApiOperation({ summary: 'Get all sale items' })
  @ApiResponse({ status: 200, description: 'Return all sale items.', type: [SaleItem] })
  async findAll() {
    const saleItems = await this.saleItemsService.findAll();
    return { statusCode: 200, message: "Sale items retrieved successfully", saleItems };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a sale item by ID' })
  @ApiResponse({ status: 200, description: 'Return a single sale item.', type: SaleItem })
  @ApiResponse({ status: 404, description: 'Sale item not found.' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const saleItem = await this.saleItemsService.findOne(id);
    return { statusCode: 200, message: "Sale item retrieved successfully", saleItem };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a sale item by ID' })
  @ApiResponse({ status: 200, description: 'The sale item has been successfully updated.', type: SaleItem })
  @ApiResponse({ status: 404, description: 'Sale item not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateSaleItemDto: UpdateSaleItemDto) {
    const updatedSaleItem = await this.saleItemsService.update(id, updateSaleItemDto);
    return { statusCode: 200, message: "Sale item updated successfully", updatedSaleItem };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a sale item by ID' })
  @ApiResponse({ status: 200, description: 'The sale item has been successfully deleted.', type: SaleItem })
  @ApiResponse({ status: 404, description: 'Sale item not found.' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const deletedSaleItem = await this.saleItemsService.remove(id);
    return { statusCode: 200, message: "Sale item deleted successfully", deletedSaleItem };
  }
}
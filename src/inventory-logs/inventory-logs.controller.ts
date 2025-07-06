import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { InventoryLogsService } from './inventory-logs.service';
import { CreateInventoryLogDto } from './dto/create-inventory-log.dto';
import { UpdateInventoryLogDto } from './dto/update-inventory-log.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InventoryLog } from './entities/inventory-log.entity';

@ApiTags('inventory-logs')
@Controller('inventory-logs')
export class InventoryLogsController {
  constructor(private readonly inventoryLogsService: InventoryLogsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new inventory log entry' })
  @ApiResponse({ status: 201, description: 'The inventory log entry has been successfully created.', type: InventoryLog })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createInventoryLogDto: CreateInventoryLogDto) {
    const newInventoryLog = await this.inventoryLogsService.create(createInventoryLogDto);
    return { statusCode: 201, message: "Inventory log entry created successfully", newInventoryLog };
  }

  @Get()
  @ApiOperation({ summary: 'Get all inventory log entries' })
  @ApiResponse({ status: 200, description: 'Return all inventory log entries.', type: [InventoryLog] })
  async findAll() {
    const inventoryLogs = await this.inventoryLogsService.findAll();
    return { statusCode: 200, message: "Inventory log entries retrieved successfully", inventoryLogs };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an inventory log entry by ID' })
  @ApiResponse({ status: 200, description: 'Return a single inventory log entry.', type: InventoryLog })
  @ApiResponse({ status: 404, description: 'Inventory log entry not found.' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const inventoryLog = await this.inventoryLogsService.findOne(id);
    return { statusCode: 200, message: "Inventory log entry retrieved successfully", inventoryLog };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an inventory log entry by ID' })
  @ApiResponse({ status: 200, description: 'The inventory log entry has been successfully updated.', type: InventoryLog })
  @ApiResponse({ status: 404, description: 'Inventory log entry not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateInventoryLogDto: UpdateInventoryLogDto) {
    const updatedInventoryLog = await this.inventoryLogsService.update(id, updateInventoryLogDto);
    return { statusCode: 200, message: "Inventory log entry updated successfully", updatedInventoryLog };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an inventory log entry by ID' })
  @ApiResponse({ status: 200, description: 'The inventory log entry has been successfully deleted.', type: InventoryLog })
  @ApiResponse({ status: 404, description: 'Inventory log entry not found.' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const deletedInventoryLog = await this.inventoryLogsService.remove(id);
    return { statusCode: 200, message: "Inventory log entry deleted successfully", deletedInventoryLog };
  }
}
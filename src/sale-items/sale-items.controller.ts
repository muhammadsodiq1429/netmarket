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
import { SaleItemsService } from "./sale-items.service";
import { CreateSaleItemDto } from "./dto/create-sale-item.dto";
import { UpdateSaleItemDto } from "./dto/update-sale-item.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { SaleItem } from "./entities/sale-item.entity";

@ApiTags("sale-items")
@Controller("sale-items")
export class SaleItemsController {
  constructor(private readonly saleItemsService: SaleItemsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new sale item" })
  @ApiResponse({
    status: 201,
    description: "The sale item has been successfully created.",
    type: SaleItem,
  })
  @ApiResponse({ status: 400, description: "Bad Request." })
  async create(@Body() createSaleItemDto: CreateSaleItemDto) {
    return this.saleItemsService.create(createSaleItemDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all sale items" })
  @ApiResponse({
    status: 200,
    description: "Return all sale items.",
    type: [SaleItem],
  })
  async findAll() {
    return this.saleItemsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a sale item by ID" })
  @ApiResponse({
    status: 200,
    description: "Return a single sale item.",
    type: SaleItem,
  })
  @ApiResponse({ status: 404, description: "Sale item not found." })
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return this.saleItemsService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a sale item by ID" })
  @ApiResponse({
    status: 200,
    description: "The sale item has been successfully updated.",
    type: SaleItem,
  })
  @ApiResponse({ status: 404, description: "Sale item not found." })
  @ApiResponse({ status: 400, description: "Bad Request." })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateSaleItemDto: UpdateSaleItemDto
  ) {
    return this.saleItemsService.update(id, updateSaleItemDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a sale item by ID" })
  @ApiResponse({
    status: 200,
    description: "The sale item has been successfully deleted.",
    type: SaleItem,
  })
  @ApiResponse({ status: 404, description: "Sale item not found." })
  async remove(@Param("id", ParseIntPipe) id: number) {
    return this.saleItemsService.remove(id);
  }
}

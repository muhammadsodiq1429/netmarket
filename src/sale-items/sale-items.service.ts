import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateSaleItemDto } from "./dto/create-sale-item.dto";
import { UpdateSaleItemDto } from "./dto/update-sale-item.dto";
import { SaleItem } from "./entities/sale-item.entity";
import { SalesService } from "../sales/sales.service";
import { ProductsService } from "../products/products.service";

@Injectable()
export class SaleItemsService {
  constructor(
    @InjectRepository(SaleItem)
    private saleItemsRepository: Repository<SaleItem>,
    private readonly salesService: SalesService,
    private readonly productsService: ProductsService
  ) {}

  async create(createSaleItemDto: CreateSaleItemDto) {
    const { sale_id, product_id } = createSaleItemDto;
    await this.salesService.findOne(sale_id);
    await this.productsService.findOne(product_id);
    const newSaleItem = await this.saleItemsRepository.save(createSaleItemDto);

    return {
      statusCode: 201,
      message: "New sale item created successfully",
      newSaleItem,
    };
  }

  async findAll() {
    const saleItems = await this.saleItemsRepository.find();
    if (saleItems.length === 0) {
      throw new NotFoundException("No sale items found.");
    }
    return { satatusCode: 200, saleItems };
  }

  async findOne(id: number) {
    const saleItem = await this.saleItemsRepository.findOneBy({ id });
    if (!saleItem) {
      throw new NotFoundException(`SaleItem with ID ${id} not found.`);
    }
    return { satatusCode: 200, saleItem };
  }

  async update(id: number, updateSaleItemDto: UpdateSaleItemDto) {
    await this.findOne(id);
    console.log(await this.findOne(id));
    const { sale_id, product_id } = updateSaleItemDto;
    if (sale_id) await this.salesService.findOne(sale_id);
    if (product_id) await this.productsService.findOne(product_id);
    const updatedSaleItem = await this.saleItemsRepository.preload({
      id,
      ...updateSaleItemDto,
    });
    await this.saleItemsRepository.save(updatedSaleItem!);

    return {
      statusCode: 200,
      message: "Sale item updated successfully",
      updatedSaleItem,
    };
  }

  async remove(id: number) {
    const { saleItem } = await this.findOne(id);
    await this.saleItemsRepository.delete(id);

    return {
      statusCode: 200,
      message: "Sale item deleted successfully",
      saleItem,
    };
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSaleItemDto } from './dto/create-sale-item.dto';
import { UpdateSaleItemDto } from './dto/update-sale-item.dto';
import { SaleItem } from './entities/sale-item.entity';

@Injectable()
export class SaleItemsService {
  constructor(
    @InjectRepository(SaleItem)
    private saleItemsRepository: Repository<SaleItem>,
  ) {}

  create(createSaleItemDto: CreateSaleItemDto) {
    const saleItem = this.saleItemsRepository.create(createSaleItemDto);
    return this.saleItemsRepository.save(saleItem);
  }

  async findAll() {
    const saleItems = await this.saleItemsRepository.find();
    if (saleItems.length === 0) {
      throw new NotFoundException('No sale items found.');
    }
    return saleItems;
  }

  async findOne(id: number) {
    const saleItem = await this.saleItemsRepository.findOneBy({ id });
    if (!saleItem) {
      throw new NotFoundException(`SaleItem with ID ${id} not found.`);
    }
    return saleItem;
  }

  async update(id: number, updateSaleItemDto: UpdateSaleItemDto) {
    const saleItem = await this.saleItemsRepository.findOneBy({ id });
    if (!saleItem) {
      throw new NotFoundException(`SaleItem with ID ${id} not found.`);
    }
    await this.saleItemsRepository.update(id, updateSaleItemDto);
    return this.saleItemsRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const saleItem = await this.saleItemsRepository.findOneBy({ id });
    if (!saleItem) {
      throw new NotFoundException(`SaleItem with ID ${id} not found.`);
    }
    await this.saleItemsRepository.delete(id);
    return saleItem;
  }
}
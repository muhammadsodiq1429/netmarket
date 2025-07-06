import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInventoryLogDto } from './dto/create-inventory-log.dto';
import { UpdateInventoryLogDto } from './dto/update-inventory-log.dto';
import { InventoryLog } from './entities/inventory-log.entity';

@Injectable()
export class InventoryLogsService {
  constructor(
    @InjectRepository(InventoryLog)
    private inventoryLogsRepository: Repository<InventoryLog>,
  ) {}

  create(createInventoryLogDto: CreateInventoryLogDto) {
    const inventoryLog = this.inventoryLogsRepository.create(createInventoryLogDto);
    return this.inventoryLogsRepository.save(inventoryLog);
  }

  async findAll() {
    const inventoryLogs = await this.inventoryLogsRepository.find();
    if (inventoryLogs.length === 0) {
      throw new NotFoundException('No inventory logs found.');
    }
    return inventoryLogs;
  }

  async findOne(id: number) {
    const inventoryLog = await this.inventoryLogsRepository.findOneBy({ id });
    if (!inventoryLog) {
      throw new NotFoundException(`InventoryLog with ID ${id} not found.`);
    }
    return inventoryLog;
  }

  async update(id: number, updateInventoryLogDto: UpdateInventoryLogDto) {
    const inventoryLog = await this.inventoryLogsRepository.findOneBy({ id });
    if (!inventoryLog) {
      throw new NotFoundException(`InventoryLog with ID ${id} not found.`);
    }
    await this.inventoryLogsRepository.update(id, updateInventoryLogDto);
    return this.inventoryLogsRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const inventoryLog = await this.inventoryLogsRepository.findOneBy({ id });
    if (!inventoryLog) {
      throw new NotFoundException(`InventoryLog with ID ${id} not found.`);
    }
    await this.inventoryLogsRepository.delete(id);
    return inventoryLog;
  }
}
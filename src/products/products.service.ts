import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Product } from "./entities/product.entity";
import { CategoriesService } from "../categories/categories.service";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly categoriesService: CategoriesService
  ) {}

  async create(createProductDto: CreateProductDto) {
    if (createProductDto.sku) {
      const existingProduct = await this.productsRepository.findOne({
        where: { sku: createProductDto.sku },
      });
      if (existingProduct) {
        throw new ConflictException(
          `Product with SKU "${createProductDto.sku}" already exists.`
        );
      }
    }
    await this.categoriesService.findOne(createProductDto.category_id);

    const product = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(product);
  }

  async findAll() {
    const products = await this.productsRepository.find();
    if (products.length === 0) {
      throw new NotFoundException("No products found.");
    }
    return products;
  }

  async findOne(id: number) {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productsRepository.findOneBy({ id });
    const { category_id } = updateProductDto;
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }
    if (updateProductDto.sku && updateProductDto.sku !== product.sku) {
      const existingProduct = await this.productsRepository.findOne({
        where: { sku: updateProductDto.sku },
      });
      if (existingProduct) {
        throw new ConflictException(
          `Product with SKU "${updateProductDto.sku}" already exists.`
        );
      }
    }
    if (category_id) await this.categoriesService.findOne(category_id);

    await this.productsRepository.update(id, updateProductDto);
    return this.productsRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }
    await this.productsRepository.delete(id);
    return product;
  }
}

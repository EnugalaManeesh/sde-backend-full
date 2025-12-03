import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { User } from '../users/user.entity';

@Injectable()
export class ItemsService {
  constructor(@InjectRepository(Item) private repo: Repository<Item>) {}

  async create(dto: CreateItemDto, owner: User) {
    const item = this.repo.create({ ...dto, owner } as any);
    return this.repo.save(item);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Item not found');
    return item;
  }

  async update(id: string, dto: Partial<CreateItemDto>, requester?: any) {
    const item = await this.findOne(id);
    if (requester && item.owner && requester.userId !== item.owner.id) {
      throw new ForbiddenException('Not allowed to update');
    }
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string, requester?: any) {
    const item = await this.findOne(id);
    if (requester && item.owner && requester.userId !== item.owner.id) {
      throw new ForbiddenException('Not allowed to delete');
    }
    const r = await this.repo.delete(id);
    if (r.affected === 0) throw new NotFoundException('Item not found');
    return { deleted: true };
  }
}

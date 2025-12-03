import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { User } from '../users/user.entity';
export declare class ItemsService {
    private repo;
    constructor(repo: Repository<Item>);
    create(dto: CreateItemDto, owner: User): Promise<Item[]>;
    findAll(): Promise<Item[]>;
    findOne(id: string): Promise<Item>;
    update(id: string, dto: Partial<CreateItemDto>, requester?: any): Promise<Item>;
    remove(id: string, requester?: any): Promise<{
        deleted: boolean;
    }>;
}

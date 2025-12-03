import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
export declare class ItemsController {
    private itemsService;
    constructor(itemsService: ItemsService);
    create(dto: CreateItemDto, req: any): Promise<import("./item.entity").Item[]>;
    findAll(): Promise<import("./item.entity").Item[]>;
    findOne(id: string): Promise<import("./item.entity").Item>;
    update(id: string, dto: Partial<CreateItemDto>, req: any): Promise<import("./item.entity").Item>;
    remove(id: string, req: any): Promise<{
        deleted: boolean;
    }>;
}

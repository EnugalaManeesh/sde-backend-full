"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const items_service_1 = require("../src/items/items.service");
const typeorm_1 = require("@nestjs/typeorm");
const item_entity_1 = require("../src/items/item.entity");
describe('ItemsService', () => {
    let service;
    const mockRepo = {
        create: jest.fn(),
        save: jest.fn(),
        find: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                items_service_1.ItemsService,
                { provide: (0, typeorm_1.getRepositoryToken)(item_entity_1.Item), useValue: mockRepo },
            ],
        }).compile();
        service = module.get(items_service_1.ItemsService);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should create an item', async () => {
        const dto = { title: 't1', description: 'd' };
        const owner = { id: 'user-1' };
        mockRepo.create.mockReturnValue({ ...dto, owner });
        mockRepo.save.mockResolvedValue({ id: '1', ...dto, owner });
        const res = await service.create(dto, owner);
        expect(mockRepo.create).toBeCalledWith({ ...dto, owner });
        expect(mockRepo.save).toBeCalled();
        expect(res).toHaveProperty('id');
    });
    it('should find all', async () => {
        mockRepo.find.mockResolvedValue([{ id: '1', title: 't1' }]);
        const r = await service.findAll();
        expect(r).toHaveLength(1);
    });
});
//# sourceMappingURL=items.service.spec.js.map
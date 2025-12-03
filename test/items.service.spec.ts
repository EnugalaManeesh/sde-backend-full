import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from '../src/items/items.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Item } from '../src/items/item.entity';

describe('ItemsService', () => {
  let service: ItemsService;

  const mockRepo = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        { provide: getRepositoryToken(Item), useValue: mockRepo },
      ],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create an item', async () => {
    const dto = { title: 't1', description: 'd' };
    const owner = { id: 'user-1' } as any;
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

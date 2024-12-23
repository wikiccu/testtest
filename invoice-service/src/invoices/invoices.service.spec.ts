import { Test, TestingModule } from '@nestjs/testing';
import { InvoicesService } from './invoices.service';
import { getModelToken } from '@nestjs/mongoose';
import { Invoice } from './invoice.schema';
import { Model } from 'mongoose';

describe('InvoicesService', () => {
  let service: InvoicesService;
  let model: Model<Invoice>;

  const mockInvoice = {
    customer: 'John Doe',
    amount: 1000,
    reference: 'INV123',
    date: new Date(),
    items: [{ sku: 'A001', qt: 10 }],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvoicesService,
        {
          provide: getModelToken(Invoice.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockInvoice),
            constructor: jest.fn().mockResolvedValue(mockInvoice),
            findById: jest.fn().mockResolvedValue(mockInvoice),
            find: jest.fn().mockResolvedValue([mockInvoice]),
            save: jest.fn().mockResolvedValue(mockInvoice),
          },
        },
      ],
    }).compile();

    service = module.get<InvoicesService>(InvoicesService);
    model = module.get<Model<Invoice>>(getModelToken(Invoice.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an invoice', async () => {
    const result = await service.createInvoice(mockInvoice);
    expect(result).toEqual(mockInvoice);
  });

  it('should retrieve an invoice by ID', async () => {
    const result = await service.getInvoiceById('1');
    expect(result).toEqual(mockInvoice);
  });

  it('should retrieve all invoices', async () => {
    const result = await service.getAllInvoices();
    expect(result).toEqual([mockInvoice]);
  });
});

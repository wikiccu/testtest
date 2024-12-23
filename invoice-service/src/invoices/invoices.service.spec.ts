import { Test, TestingModule } from '@nestjs/testing';
import { InvoicesService } from './invoices.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invoice } from './invoice.schema';

describe('InvoicesService', () => {
  let service: InvoicesService;
  let model: Model<Invoice>;

  beforeEach(async () => {
    const mockInvoiceDoc = {
      save: jest.fn().mockResolvedValue({ id: '123', ...mockCreateInvoiceDto }),
    };

    const mockInvoiceModel = {
      // Mock `new this.invoiceModel(createInvoiceDto)`
      constructor: jest.fn().mockImplementation(() => mockInvoiceDoc),
      // Mock `findById().exec()`
      findById: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue({ id: '123', ...mockCreateInvoiceDto }),
      }),
      // Mock `find().exec()`
      find: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue([{ id: '123', ...mockCreateInvoiceDto }]),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvoicesService,
        {
          provide: getModelToken(Invoice.name),
          useValue: mockInvoiceModel,
        },
      ],
    }).compile();

    service = module.get<InvoicesService>(InvoicesService);
    model = module.get<Model<Invoice>>(getModelToken(Invoice.name));
  });

  const mockCreateInvoiceDto = {
    customer: 'John Doe',
    amount: 1000,
    reference: 'INV123',
    date: new Date(),
    items: [
      { sku: 'item1', qt: 2 },
      { sku: 'item2', qt: 3 },
    ],
  };

  it('should create an invoice', async () => {
    const result = await service.createInvoice(mockCreateInvoiceDto);
    expect(result).toEqual({ id: '123', ...mockCreateInvoiceDto });
  });

  it('should retrieve an invoice by ID', async () => {
    const result = await service.getInvoiceById('123');
    expect(result).toEqual({ id: '123', ...mockCreateInvoiceDto });
    expect(model.findById).toHaveBeenCalledWith('123');
  });

  it('should retrieve all invoices', async () => {
    const result = await service.getAllInvoices();
    expect(result).toEqual([{ id: '123', ...mockCreateInvoiceDto }]);
    expect(model.find).toHaveBeenCalled();
  });
});

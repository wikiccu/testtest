import { Test, TestingModule } from '@nestjs/testing';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

describe('InvoicesController', () => {
  let app: INestApplication;
  let invoicesService = { createInvoice: jest.fn(), getInvoiceById: jest.fn(), getAllInvoices: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoicesController],
      providers: [
        {
          provide: InvoicesService,
          useValue: invoicesService,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('should create an invoice', async () => {
    const createInvoiceDto: CreateInvoiceDto = {
      customer: 'John Doe',
      amount: 1000,
      reference: 'INV123',
      items: [{ sku: 'A001', qt: 10 }],
    };

    invoicesService.createInvoice.mockResolvedValue(createInvoiceDto);
    return request(app.getHttpServer())
      .post('/invoices')
      .send(createInvoiceDto)
      .expect(201)
      .expect(createInvoiceDto);
  });

  it('should retrieve an invoice by ID', async () => {
    const invoice = {
      customer: 'John Doe',
      amount: 1000,
      reference: 'INV123',
      items: [{ sku: 'A001', qt: 10 }],
    };

    invoicesService.getInvoiceById.mockResolvedValue(invoice);
    return request(app.getHttpServer())
      .get('/invoices/1')
      .expect(200)
      .expect(invoice);
  });

  it('should retrieve all invoices with query params', async () => {
    const invoice = {
      customer: 'John Doe',
      amount: 1000,
      reference: 'INV123',
      items: [{ sku: 'A001', qt: 10 }],
    };

    invoicesService.getAllInvoices.mockResolvedValue([invoice]);
    return request(app.getHttpServer())
      .get('/invoices')
      .query({ startDate: '2023-01-01', endDate: '2023-12-31' })
      .expect(200)
      .expect([invoice]);
  });

  afterAll(async () => {
    await app.close();
  });
});

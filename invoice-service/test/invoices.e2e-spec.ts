import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateInvoiceDto } from '../src/invoices/dto/create-invoice.dto';
import { Invoice } from '../src/invoices/invoice.schema';

describe('InvoicesController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], // Replace with your module importing InvoicesModule
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /invoices', () => {
    it('should create a new invoice with nested items', async () => {
      const createInvoiceDto: CreateInvoiceDto = {
        customer: 'John Doe',
        amount: 150.0,
        reference: 'INV-12345',
        items: [
          { sku: 'item-001', qt: 2 },
          { sku: 'item-002', qt: 5 },
        ],
      };

      const response = await request(app.getHttpServer())
        .post('/invoices')
        .send(createInvoiceDto)
        .expect(201);

      expect(response.body).toMatchObject<CreateInvoiceDto>({
        customer: 'John Doe',
        amount: 150.0,
        reference: 'INV-12345',
        items: [
          { sku: 'item-001', qt: 2 },
          { sku: 'item-002', qt: 5 },
        ],
      });
    });

    it('should return a 400 error for invalid data', async () => {
      const invalidInvoiceDto = {
        customer: 'John Doe',
        amount: 'invalid-amount', // Invalid field
        reference: 'INV-12345',
        items: [
          { sku: 'item-001', qt: 2 },
          { sku: 'item-002' }, // Missing `qt`
        ],
      };

      await request(app.getHttpServer())
        .post('/invoices')
        .send(invalidInvoiceDto)
        .expect(400);
    });
  });

  describe('GET /invoices/:id', () => {
    let createdInvoice: Invoice;

    beforeAll(async () => {
      const createInvoiceDto: CreateInvoiceDto = {
        customer: 'Jane Doe',
        amount: 250.75,
        reference: 'INV-67890',
        items: [
          { sku: 'item-003', qt: 1 },
          { sku: 'item-004', qt: 3 },
        ],
      };

      const response = await request(app.getHttpServer())
        .post('/invoices')
        .send(createInvoiceDto);

      createdInvoice = response.body;
    });

    it('should return 404 if invoice is not found', async () => {
      await request(app.getHttpServer())
        .get('/invoices/invalid-id')
        .expect(404);
    });
  });

  describe('GET /invoices', () => {
    beforeAll(async () => {
      const invoices: CreateInvoiceDto[] = [
        {
          customer: 'Customer A',
          amount: 300,
          reference: 'INV-11111',
          items: [{ sku: 'item-005', qt: 4 }],
        },
        {
          customer: 'Customer B',
          amount: 500,
          reference: 'INV-22222',
          items: [{ sku: 'item-006', qt: 6 }],
        },
      ];

      for (const invoice of invoices) {
        await request(app.getHttpServer()).post('/invoices').send(invoice);
      }
    });

    it('should retrieve all invoices', async () => {
      const response = await request(app.getHttpServer())
        .get('/invoices')
        .expect(200);

      expect(response.body.length).toBeGreaterThanOrEqual(2);
    });

    it('should filter invoices by date range', async () => {
      const response = await request(app.getHttpServer())
        .get('/invoices')
        .query({ startDate: '2024-12-19', endDate: '2024-12-21' })
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      // Add further assertions based on the filtering logic in your service.
    });
  });
});

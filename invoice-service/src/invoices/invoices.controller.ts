import { Controller, Post, Get, Param, Body, Query } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { Invoice } from './invoice.schema';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) { }

  // POST /invoices: Create a new invoice
  @Post()
  async createInvoice(@Body() createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    return this.invoicesService.createInvoice(createInvoiceDto);
  }

  // GET /invoices/:id: Retrieve an invoice by ID
  @Get(':id')
  async getInvoice(@Param('id') id: string): Promise<Invoice | null> {
    return this.invoicesService.getInvoiceById(id);
  }

  // GET /invoices: Retrieve invoices with optional filtering by date range
  @Get()
  async getAllInvoices(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ): Promise<Invoice[]> {
    return this.invoicesService.getAllInvoices(startDate, endDate);
  }
}

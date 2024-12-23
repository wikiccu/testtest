import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invoice, InvoiceDocument } from './invoice.schema';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectModel(Invoice.name) private invoiceModel: Model<InvoiceDocument>,
  ) { }

  // Create a new invoice
  async createInvoice(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    const createdInvoice = new this.invoiceModel(createInvoiceDto);
    return createdInvoice.save();
  }

  // Get an invoice by ID
  async getInvoiceById(id: string): Promise<Invoice | null> {
    return this.invoiceModel.findById(id).exec();
  }

  // Get invoices, optionally filtering by date range
  async getAllInvoices(startDate?: string, endDate?: string): Promise<Invoice[]> {
    let filter = {};
    if (startDate || endDate) {
      const filterConditions: any = {};
      if (startDate) filterConditions.date = { $gte: new Date(startDate) };
      if (endDate) filterConditions.date = { ...filterConditions.date, $lte: new Date(endDate) };
      filter = filterConditions;
    }

    return this.invoiceModel.find(filter).exec();
  }

  // Test Get all invoices 
  // async getAllInvoices(): Promise<Invoice[]> {
  //   return this.invoiceModel.find().exec();
  // }
}

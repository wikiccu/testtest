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

  // Calculate total sales and quantity sold for the day
  async generateDailySalesReport() {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    // Fetch all invoices for today
    const invoices = await this.invoiceModel.find({
      date: { $gte: startOfDay, $lte: endOfDay },
    }).exec();

    // Calculate totals
    const totalSales = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
    const itemSummary = invoices.flatMap(invoice => invoice.items)
      .reduce((summary, item) => {
        summary[item.sku] = (summary[item.sku] || 0) + item.qt;
        return summary;
      }, {});

    return { totalSales, itemSummary };
  }

  // Example RabbitMQ publishing logic
  async publishDailySalesReport(report: any) {
    // Logic to publish report to RabbitMQ
    console.log('Publishing report:', report);
  }
  // Test Get all invoices 
  // async getAllInvoices(): Promise<Invoice[]> {
  //   return this.invoiceModel.find().exec();
  // }
}

import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InvoicesService } from './../invoices/invoices.service';

@Injectable()
export class InvoiceCronService {
  private readonly logger = new Logger(InvoiceCronService.name);

  constructor(private readonly invoiceService: InvoicesService) { }

  @Cron(CronExpression.EVERY_DAY_AT_NOON) // Runs every day at 12:00 PM
  async handleDailySalesReport() {
    this.logger.log('Running daily sales report generation task...');
    try {
      // Generate daily sales report
      const report = await this.invoiceService.generateDailySalesReport();

      // Publish to RabbitMQ (or other handling logic)
      await this.invoiceService.publishDailySalesReport(report);

      this.logger.log('Daily sales report generated and published successfully.');
    } catch (error) {
      this.logger.error('Error generating daily sales report:', error.message);
    }
  }
}

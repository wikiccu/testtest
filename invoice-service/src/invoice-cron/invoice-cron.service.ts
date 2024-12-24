import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InvoicesService } from './../invoices/invoices.service';
import { MessageBrokerService } from 'src/message-broker/message-broker.service';
import { ExchangeEnum } from 'src/message-broker/enums/exchange.enum';
import { RoutingKeyEnum } from 'src/message-broker/enums/routing-key.enum';

@Injectable()
export class InvoiceCronService {
  private readonly logger = new Logger(InvoiceCronService.name);

  constructor(
    private readonly invoiceService: InvoicesService,
    private readonly messageBrokerService: MessageBrokerService,
  ) {}

  @Cron(CronExpression.EVERY_30_SECONDS) // Runs every day at 12:00 PM
  async handleDailySalesReport() {
    this.logger.log('Running daily sales report generation task...');
    try {
      // Generate daily sales report
      const report = await this.invoiceService.generateDailySalesReport();
      console.log({ report });

      this.messageBrokerService.publishMessage(
        ExchangeEnum.EMAIL_SERVICE,
        RoutingKeyEnum.SEND_SINGLE_EMAIL,
        { report },
      );

      this.logger.log(
        'Daily sales report generated and published successfully.',
      );
    } catch (error) {
      this.logger.error('Error generating daily sales report:', error.message);
    }
  }
}

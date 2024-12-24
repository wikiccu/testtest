import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';
import { Invoice, InvoiceSchema } from './invoice.schema';
import { InvoiceCronService } from 'src/invoice-cron/invoice-cron.service';
import { MessageBrokerModule } from 'src/message-broker/message-broker.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Invoice.name, schema: InvoiceSchema }]),
    MessageBrokerModule,
  ],
  controllers: [InvoicesController],
  providers: [InvoicesService, InvoiceCronService],
})
export class InvoicesModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { AppService } from './app.service';
import { InvoicesModule } from './invoices/invoices.module';
import { ReportsModule } from './reports/reports.module';
import { MongooseModule } from '@nestjs/mongoose';
import { InvoiceCronService } from './invoice-cron/invoice-cron.service';

@Module({
  imports: [InvoicesModule, ReportsModule,
    // MongooseModule.forRoot('mongodb://admin:password@localhost:27017/invoice_db?authSource=admin')
    MongooseModule.forRoot('mongodb://localhost:27017/invoiceDB'),
    ScheduleModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService, InvoiceCronService],
})
export class AppModule { }

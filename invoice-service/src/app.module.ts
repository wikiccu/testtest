import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { AppService } from './app.service';
import { InvoicesModule } from './invoices/invoices.module';
import { MongooseModule } from '@nestjs/mongoose';
import { InvoiceCronService } from './invoice-cron/invoice-cron.service';

@Module({
  imports: [
    InvoicesModule,
    // MongooseModule.forRoot('mongodb://admin:password@localhost:27017/invoice_db?authSource=admin')
    MongooseModule.forRoot('mongodb://localhost:12345/invoice'),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

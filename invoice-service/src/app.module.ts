import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InvoicesModule } from './invoices/invoices.module';
import { ReportsModule } from './reports/reports.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [InvoicesModule, ReportsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/invoiceDB')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

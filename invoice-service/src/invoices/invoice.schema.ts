import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Extend Document to enable MongoDB's document features
export type InvoiceDocument = Invoice & Document;

// Define the schema for the Invoice model
@Schema({ timestamps: true })
export class Invoice {
  @Prop({ required: true })
  customer: string;

  @Prop({ required: true, type: Number })
  amount: number;

  @Prop({ required: true, unique: true })
  reference: string;

  @Prop({ required: true, type: Date, default: Date.now })
  date: Date;

  @Prop({
    type: [
      {
        sku: { type: String, required: true },
        qt: { type: Number, required: true },
      },
    ],
  })
  items: { sku: string; qt: number }[];
}

// Generate the Mongoose schema
export const InvoiceSchema = SchemaFactory.createForClass(Invoice);

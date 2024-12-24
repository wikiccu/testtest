import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { MessageBrokerService } from './message-broker.service';
import { createMessageBrokerConfig } from './configs/message-broker.config';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [],
      inject: [],
      useFactory: async () => createMessageBrokerConfig(),
    }),
    EmailModule,
  ],
  providers: [MessageBrokerService],
  exports: [MessageBrokerService],
})
export class MessageBrokerModule {}
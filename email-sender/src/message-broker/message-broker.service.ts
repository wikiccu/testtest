import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { ExchangeEnum } from './enums/exchange.enum';
import { RoutingKeyEnum } from './enums/routing-key.enum';
import { QueueEnum } from './enums/queue.enum';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class MessageBrokerService {
  constructor(private readonly emailService: EmailService) {}

  @RabbitSubscribe({
    exchange: ExchangeEnum.EMAIL_SERVICE,
    routingKey: RoutingKeyEnum.SEND_SINGLE_EMAIL,
    queue: QueueEnum.EMAIL_QUEUE,
  })
  public async workspaceEventsHandler(message: any) {
    await this.emailService.sendEmail(
      'taha.romany@gmail.com', //TODO: Set Env admin email
      'email test', //TODO: Set subject
      message.report,
    );
  }
}

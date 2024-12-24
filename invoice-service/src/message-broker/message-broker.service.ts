import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { ExchangeEnum } from './enums/exchange.enum';
import { RoutingKeyEnum } from './enums/routing-key.enum';

@Injectable()
export class MessageBrokerService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  public publishMessage<T>(
    exchange: ExchangeEnum,
    routingKey: RoutingKeyEnum,
    message: T,
  ) {
    this.amqpConnection.publish(exchange, routingKey, message);
  }
}

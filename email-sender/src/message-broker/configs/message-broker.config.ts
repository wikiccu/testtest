import { ExchangeEnum } from '../enums/exchange.enum';
import { MessageBrokerConfiguration } from '../interfaces/message-broker-configuration.interface';

export const createMessageBrokerConfig = (): MessageBrokerConfiguration => {
  return {
    exchanges: [
      {
        name: ExchangeEnum.EMAIL_SERVICE,
        type: 'topic',
      },
    ],
    uri: 'amqp://localhost:5672', //TODO: set this on ENV
    enableControllerDiscovery: true,
    channels: {
      'channel-1': {
        prefetchCount: 15,
        default: true,
      },
    },
    connectionInitOptions: {
      wait: false,
    },
  };
};

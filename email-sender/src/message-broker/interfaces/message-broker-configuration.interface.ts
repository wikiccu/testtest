import { ExchangeEnum } from "../enums/exchange.enum";

export interface MessageBrokerConfiguration {
	exchanges: [{ name: ExchangeEnum; type: string }];
	uri: string;
	enableControllerDiscovery: boolean;
	channels: {
		[channelName: string]: {
			prefetchCount: number;
			default: boolean;
		};
	};
	connectionInitOptions: {
		wait: boolean;
	};
}

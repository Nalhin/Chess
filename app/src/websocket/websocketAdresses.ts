import { WebsocketTypes } from './websocketTypes';

const baseAddress = process.env.BASE_WEBSOCKET_URL;

export const websocketAddresses = {
  [WebsocketTypes.GAME]: `${baseAddress}/game`,
  [WebsocketTypes.CHAT]: `${baseAddress}/chat`,
  [WebsocketTypes.QUEUE]: `${baseAddress}/queue`,
};

import { websocketTypes } from './websocketTypes';

const baseAddress = process.env.BASE_WEBSOCKET_URL;

export const websocketAddresses = {
  [websocketTypes.GAME]: `${baseAddress}/game/websocket`,
  [websocketTypes.CHAT]: `${baseAddress}/chat/websocket`,
};

import { websocketTypes } from './websocketTypes';

const baseAddress = process.env.BASE_WEBSOCKET_URL;

export const websocketAddresses = {
  [websocketTypes.GAME]: `${baseAddress}/game`,
  [websocketTypes.CHAT]: `${baseAddress}/chat`,
  [websocketTypes.QUEUE]: `${baseAddress}/queue`,
};

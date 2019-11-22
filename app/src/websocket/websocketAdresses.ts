import { websocketTypes } from './websocketTypes';

const baseAddress = 'ws://127.0.0.1';

export const websocketAddresses = {
  [websocketTypes.GAME]: `${baseAddress}:8081/game/websocket`,
  [websocketTypes.CHAT]: `${baseAddress}:8082/chat/websocket`,
};

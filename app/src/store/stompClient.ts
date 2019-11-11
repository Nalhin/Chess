import { RxStomp } from '@stomp/rx-stomp';

const stompConfig = {
  brokerURL: 'ws://127.0.0.1:8080/game/websocket',
  debug: function(str: any) {
    console.log(str);
  },
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
};

export const stomp = new RxStomp();

stomp.activate();
stomp.configure(stompConfig);

import { RxStomp } from '@stomp/rx-stomp';
import { stompConfig } from './stompConfig';
import { WebsocketTypes } from './websocketTypes';
import { websocketAddresses } from './websocketAdresses';

const stompFactory = (
  type: WebsocketTypes,
): { [key in WebsocketTypes]?: RxStomp } => {
  const rxStomp = new RxStomp();
  rxStomp.configure({
    ...stompConfig,
    brokerURL: websocketAddresses[type],
  });
  rxStomp.activate();
  return { [type]: rxStomp };
};

export class StompSingleton {
  private static instances?: { [key in WebsocketTypes]?: RxStomp };

  static getInstance(type: WebsocketTypes) {
    if (StompSingleton.instances?.[type]) {
      if (!StompSingleton.instances[type].active) {
        StompSingleton.instances[type].activate();
      }

      return StompSingleton.instances[type];
    }

    StompSingleton.instances = stompFactory(type);

    return StompSingleton.instances[type];
  }

  static deactivateInstance(type: WebsocketTypes) {
    if (!StompSingleton.instances[type]) {
      return;
    }
    StompSingleton.instances[type].deactivate();
  }
}

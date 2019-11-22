import { RxStomp } from '@stomp/rx-stomp';
import { stompConfig } from './stompConfig';
import { websocketTypes } from './websocketTypes';
import { websocketAddresses } from './websocketAdresses';

const stompFactory = (
  type: websocketTypes,
): { [key in websocketTypes]?: RxStomp } => {
  const rxStomp = new RxStomp();
  rxStomp.configure({
    ...stompConfig,
    brokerURL: websocketAddresses[type],
  });
  rxStomp.activate();
  return { [type]: rxStomp };
};

export class StompSingleton {
  private static instances?: { [key in websocketTypes]?: RxStomp };

  static getInstance(type: websocketTypes) {
    if (StompSingleton.instances?.[type]) {
      return StompSingleton.instances[type];
    }

    StompSingleton.instances = stompFactory(type);

    return StompSingleton.instances[type];
  }
}

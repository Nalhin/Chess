import { Observable } from 'rxjs';

class MockStomp {
  private messages: any[];

  constructor(messages?: any[]) {
    this.messages = messages;
  }

  watch = () => {
    return new Observable(subscriber => {
      this.messages.map(message => subscriber.next(message));
    });
  };
  publish = jest.fn();
  deactivate = jest.fn();
}

export default MockStomp;

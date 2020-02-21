import React from 'react';

export function useReconnect(
  shouldReconnect: boolean,
  reconnect: () => void,
  timeoutTime: number,
) {
  const [hasTimePassed, setTimePassed] = React.useState(false);

  React.useEffect(() => {
    let timeout: number = null;
    if (shouldReconnect && !hasTimePassed) {
      timeout = window.setTimeout(() => setTimePassed(true), timeoutTime);
    }
    return () => window.clearTimeout(timeout);
  }, [shouldReconnect]);

  React.useEffect(() => {
    if (hasTimePassed && shouldReconnect) {
      reconnect();
    }
  }, [hasTimePassed, shouldReconnect]);
}

import React from 'react';

export function useReconnect(
  shouldReconnect: boolean,
  reconnect: () => void,
  timeoutTime: number,
) {
  const [hasTimePassed, setTimePassed] = React.useState(false);

  React.useEffect(() => {
    let timeout: NodeJS.Timeout = null;
    if (shouldReconnect && !hasTimePassed) {
      timeout = setTimeout(() => setTimePassed(true), timeoutTime);
    }
    return () => clearTimeout(timeout);
  }, [hasTimePassed]);

  React.useEffect(() => {
    if (hasTimePassed && shouldReconnect) {
      reconnect();
      console.log('xd');
    }
  }, [hasTimePassed, shouldReconnect]);
}

import * as React from 'react';
import styled from '@emotion/styled';
import mixins from '../../styles/mixins';
import { CircularProgress, Fade } from '@material-ui/core';

const SpinnerWrapper = styled.div`
  ${mixins.fixedCenter};
  ${mixins.flexCenter};
  z-index: 2000;
  pointer-events: none;
`;

interface Props {
  isLoading: boolean;
  children?: React.ReactNode;
  className?: string;
}

const WAIT_TIME = 200;

const Loader: React.FC<Props> = ({ isLoading, children, className }) => {
  const [isShown, setIsShown] = React.useState(false);

  React.useEffect(() => {
    let timeout: number = null;
    if (isLoading) {
      timeout = window.setTimeout(() => setIsShown(true), WAIT_TIME);
    } else {
      window.clearTimeout(timeout);
      setIsShown(false);
    }
    return () => window.clearTimeout(timeout);
  }, [isLoading]);

  return (
    <div className={className}>
      <SpinnerWrapper>
        <Fade in={isShown} unmountOnExit>
          <CircularProgress />
        </Fade>
      </SpinnerWrapper>
      {children}
    </div>
  );
};

Loader.defaultProps = {
  isLoading: false,
};

export default Loader;

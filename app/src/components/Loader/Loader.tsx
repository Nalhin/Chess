import * as React from 'react';
import styled from '@emotion/styled';
import { BounceLoader } from 'react-spinners';

const Wrapper = styled.div`
  position: relative;
`;

const SpinnerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

interface Props {
  isLoading: boolean;
  children?: React.ReactNode;
  className?: string;
}

const Loader: React.FC<Props> = ({ isLoading, children, className }) => {
  return (
    <Wrapper className={className}>
      {isLoading && (
        <SpinnerWrapper>
          <BounceLoader loading={isLoading} color={'#36D7B7'} size={150} />
        </SpinnerWrapper>
      )}
      {children}
    </Wrapper>
  );
};

Loader.defaultProps = {
  isLoading: false,
};

export default Loader;

import * as React from 'react';
import styled from '@emotion/styled';
import BounceLoader from 'react-spinners/BounceLoader';
import mixins from '../../styles/mixins';

const Wrapper = styled.div`
  position: relative;
`;

const SpinnerWrapper = styled.div`
  ${mixins.fixedCenter};
  ${mixins.absoluteCenter};
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
          <BounceLoader loading={true} color={'#36D7B7'} size={150} />
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

import React from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import styled from '@emotion/styled';
import mixins from '../../styles/mixins';

const StyledButtonContainer = styled.div`
  position: relative;
`;

const StyledLoaderWrapper = styled.div`
  ${mixins.absoluteCenter};
  ${mixins.flexCenter};
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

interface Props {
  onClick?: () => void;
  isLoading: boolean;
  className?: string;
}

const ButtonWithLoader: React.FC<Props> = ({
  onClick,
  isLoading,
  children,
  className,
}) => {
  return (
    <StyledButtonContainer className={className}>
      <StyledButton
        color="primary"
        variant="contained"
        disabled={isLoading}
        onClick={onClick}
      >
        {children}
      </StyledButton>
      {isLoading && (
        <StyledLoaderWrapper>
          <CircularProgress size={24} />
        </StyledLoaderWrapper>
      )}
    </StyledButtonContainer>
  );
};

export default ButtonWithLoader;

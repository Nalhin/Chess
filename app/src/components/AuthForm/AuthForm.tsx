import React from 'react';
import { Card, Typography, useTheme } from '@material-ui/core';
import styled from '@emotion/styled';

const StyledWrapper = styled.div``;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: ${props => props.theme.spacing(2)}px;
  > div,
  button {
    margin: ${props => props.theme.spacing(0.5)}px 0;
  }
`;

const StyledCard = styled(Card)`
  max-width: 90%;
  width: 400px;
  margin: ${props => props.theme.spacing(4)}px auto;
`;

const StyledHeader = styled.div`
  background: ${props => props.theme.palette.primary.main};
  text-align: center;
  color: ${props => props.theme.palette.primary.contrastText};
  padding: ${props => props.theme.spacing(1)}px;
`;

interface Props {
  headerText: string;
}

const AuthForm: React.FC<Props> = ({ children, headerText }) => {
  const theme = useTheme();

  return (
    <StyledWrapper>
      <StyledCard theme={theme}>
        <StyledHeader theme={theme}>
          <Typography variant="h4">{headerText}</Typography>
        </StyledHeader>
        <StyledForm theme={theme}>{children}</StyledForm>
      </StyledCard>
    </StyledWrapper>
  );
};

export default AuthForm;

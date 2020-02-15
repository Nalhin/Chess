import React from 'react';
import { HomeContainerProps } from './Home.container';
import styled from '@emotion/styled';
import { Card, useTheme } from '@material-ui/core';
import { emptyBoard } from '../../components/BoardStateless/defaultBoardState';
import Queue from './Queue/Queue.container';
import Info from './Info';
import mixins from '../../styles/mixins';
import BoardStateless from '../../components/BoardStateless/BoardStateless';
import { StyledPageTitle } from '../../components/StyledPageTitle/StyledPageTitle';

const StyledContainer = styled.div`
  margin: 0 auto;
  text-align: center;
`;

const StyledBoardContainer = styled.div`
  ${mixins.flexCenter};
  position: relative;
`;

const StyledCardWrapper = styled.div`
  ${mixins.absoluteCenter}
  ${mixins.flexCenter};
`;

const StyledCard = styled(Card)`
  padding: ${props => props.theme.spacing(3)}px;
`;

interface Props extends HomeContainerProps {}

const Home: React.FC<Props> = ({ isAuthenticated, registerUser }) => {
  const theme = useTheme();

  return (
    <StyledContainer data-testid="home">
      <StyledPageTitle variant="h4" theme={theme}>
        Play
      </StyledPageTitle>
      <StyledBoardContainer>
        <BoardStateless boardState={emptyBoard} />
        <StyledCardWrapper>
          <StyledCard theme={theme}>
            {isAuthenticated ? <Queue /> : <Info registerUser={registerUser} />}
          </StyledCard>
        </StyledCardWrapper>
      </StyledBoardContainer>
    </StyledContainer>
  );
};

export default Home;

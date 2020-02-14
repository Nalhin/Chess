import React from 'react';
import styled from '@emotion/styled';
import {
  Card,
  CircularProgress,
  Typography,
  useTheme,
} from '@material-ui/core';
import mixins from '../../../styles/mixins';
import BoardStateless from '../../../components/BoardStateless/BoardStateless';
import { defaultBoardState } from '../../../components/BoardStateless/defaultBoardState';
import PlayerPanel from '../Game/PlayerPanel/PlayerPanel';
import { StyledPageTitle } from '../../../components/StyledPageTitle/StyledPageTitle';

const StyledContainer = styled.div`
  ${mixins.flexCenter};
  position: relative;
  flex-direction: column;
`;

const StyledLoadingWrapper = styled.div`
  ${mixins.absoluteCenter}
  ${mixins.flexCenter};
`;

const StyledCard = styled(Card)`
  padding: ${props => props.theme.spacing(2)}px;
  ${mixins.flexCenter};
  flex-direction: column;
`;

const StyledTypography = styled(Typography)`
  padding-bottom: ${props => props.theme.spacing(2)}px;
`;

interface Props {}

const GameLoader: React.FC<Props> = () => {
  const theme = useTheme();
  return (
    <div>
      <StyledPageTitle variant="h4" theme={theme}>
        Loading...
      </StyledPageTitle>
      <StyledContainer theme={theme}>
        <BoardStateless boardState={defaultBoardState} />
        <StyledLoadingWrapper>
          <StyledCard theme={theme}>
            <StyledTypography variant="body1" theme={theme}>
              Populating board...
            </StyledTypography>
            <CircularProgress />
          </StyledCard>
        </StyledLoadingWrapper>
      </StyledContainer>
    </div>
  );
};

export default GameLoader;

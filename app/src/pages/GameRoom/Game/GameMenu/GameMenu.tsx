import React from 'react';
import styled from '@emotion/styled';
import {
  Card,
  CardContent,
  CardHeader,
  Fab,
  IconButton,
  Portal,
  useMediaQuery,
  useTheme,
  Zoom,
} from '@material-ui/core';
import mixins from '../../../../styles/mixins';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const StyledContainer = styled.div`
  ${mixins.absoluteCenter}
  ${mixins.flexCenter};
  ${props => props.theme.palette.grey['200']};
`;

const StyledContent = styled(CardContent)`
  ${mixins.flexCenter};
`;

const StyledFabContainer = styled.div`
  position: fixed;
  transform: none;
  right: ${props => props.theme.spacing(10)}px;
  bottom: ${props => props.theme.spacing(2.25)}px;
  ${props => props.theme.breakpoints.down('sm')} {
    transform: translateX(-50%);
    left: calc(50% + ${props => props.theme.spacing(4)}px);
    bottom: ${props => props.theme.spacing(3)}px;
  }
`;

interface Props {
  isShown: boolean;
  header: string;
}

const GameMenu: React.FC<Props> = ({ isShown, children, header }) => {
  const theme = useTheme();
  const [isHidden, setHidden] = React.useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const size = isMobile ? 'small' : 'medium';

  const handleChange = () => {
    setHidden(!isHidden);
  };

  if (!isShown) {
    return null;
  }

  return (
    <>
      <Portal>
        <StyledFabContainer theme={theme}>
          <Zoom in={isHidden} unmountOnExit>
            <Fab color="secondary" onClick={handleChange} size={size}>
              <VisibilityOffIcon />
            </Fab>
          </Zoom>
        </StyledFabContainer>
      </Portal>
      <Zoom in={!isHidden} unmountOnExit>
        <StyledContainer theme={theme}>
          <Card square>
            <CardHeader
              title={header}
              action={
                <IconButton aria-label="close" onClick={handleChange}>
                  <VisibilityIcon />
                </IconButton>
              }
            />
            <StyledContent>{children}</StyledContent>
          </Card>
        </StyledContainer>
      </Zoom>
    </>
  );
};

export default GameMenu;

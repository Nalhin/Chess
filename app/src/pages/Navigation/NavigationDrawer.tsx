import React from 'react';
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from '@material-ui/core';
import HistoryIcon from '@material-ui/icons/History';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import styled from '@emotion/styled';
import { StyledLink } from '../../components/StyledLink/StyledLink';
import { locations } from '../../contants/locations';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

const StyledList = styled(List)`
  width: 220px;
`;

const StyledDivider = styled(Divider)`
  height: 2px;
`;

interface Props {
  isOpen: boolean;
  toggleDrawer: (event: React.KeyboardEvent | React.MouseEvent) => void;
  isAuthenticated: boolean;
  logoutUser: () => void;
}

const NavigationDrawer: React.FC<Props> = ({
  isOpen,
  toggleDrawer,
  isAuthenticated,
  logoutUser,
}) => {
  return (
    <SwipeableDrawer
      open={isOpen}
      anchor="left"
      onOpen={toggleDrawer}
      onClose={toggleDrawer}
    >
      <div role="presentation" onClick={toggleDrawer} onKeyDown={toggleDrawer}>
        <StyledList>
          <StyledLink to={locations.home}>
            <ListItem button>
              <ListItemIcon>
                <SportsEsportsIcon />
              </ListItemIcon>
              <ListItemText primary="Play" />
            </ListItem>
          </StyledLink>
          {isAuthenticated && (
            <StyledLink to={locations.matchHistory}>
              <ListItem button>
                <ListItemIcon>
                  <HistoryIcon />
                </ListItemIcon>
                <ListItemText primary="My matches" />
              </ListItem>
            </StyledLink>
          )}
        </StyledList>
        <StyledDivider />
        <StyledList>
          {isAuthenticated ? (
            <ListItem button onClick={logoutUser}>
              <ListItemIcon>
                <PowerSettingsNewIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          ) : (
            <>
              <StyledLink to={locations.signIn}>
                <ListItem button>
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText primary="Sign in" />
                </ListItem>
              </StyledLink>
              <StyledLink to={locations.signUp}>
                <ListItem button>
                  <ListItemIcon>
                    <PersonAddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Sign up" />
                </ListItem>
              </StyledLink>
            </>
          )}
        </StyledList>
      </div>
    </SwipeableDrawer>
  );
};

export default NavigationDrawer;

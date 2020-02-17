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
import { Routes } from '../../interfaces/Router/Routes';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { Link } from 'react-router-dom';

const StyledList = styled(List)`
  width: 220px;
`;

const StyledDivider = styled(Divider)`
  height: 2px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
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
          <StyledLink to={Routes.home}>
            <ListItem button>
              <ListItemIcon>
                <SportsEsportsIcon />
              </ListItemIcon>
              <ListItemText primary="Play" />
            </ListItem>
          </StyledLink>
          {isAuthenticated && (
            <StyledLink to={Routes.matchHistory}>
              <ListItem button>
                <ListItemIcon>
                  <HistoryIcon />
                </ListItemIcon>
                <ListItemText primary="Match history" />
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
              <StyledLink to={Routes.login}>
                <ListItem button>
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText primary="Login" />
                </ListItem>
              </StyledLink>
              <StyledLink to={Routes.signUp}>
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

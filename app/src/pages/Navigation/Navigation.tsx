import React from 'react';
import { AppBar, IconButton, Menu, MenuItem, Toolbar } from '@material-ui/core';
import { AccountCircle, Menu as MenuIcon } from '@material-ui/icons';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/core';
import NavigationDrawer from './NavigationDrawer';
import { StyledLink } from '../../components/StyledLink/StyledLink';
import { locations } from '../../contants/locations';
import { NavigationContainerProps } from './Navigation.container';

const StyledToolbar = styled(Toolbar)`
  background: ${props => props.theme.colors.primary};
  user-select: none;
`;

const StyledUserIcon = styled.div`
  margin-left: auto;
`;

interface Props extends NavigationContainerProps {}

const Navigation: React.FC<Props> = ({ isAuthenticated, logoutUser }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  const theme = useTheme();

  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    logoutUser();
    handleClose();
  };

  const handleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <nav>
      <AppBar position="fixed">
        <NavigationDrawer
          isOpen={isDrawerOpen}
          toggleDrawer={handleDrawer}
          isAuthenticated={isAuthenticated}
          logoutUser={logoutUser}
        />
        <StyledToolbar theme={theme}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawer}
          >
            <MenuIcon />
          </IconButton>
          {isAuthenticated && (
            <StyledUserIcon>
              <IconButton
                aria-controls="menu-appbar"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <StyledLink to={locations.profile}>
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                </StyledLink>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </StyledUserIcon>
          )}
        </StyledToolbar>
      </AppBar>
    </nav>
  );
};

export default Navigation;

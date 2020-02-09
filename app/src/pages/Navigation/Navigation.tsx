import React from 'react';
import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  useTheme,
} from '@material-ui/core';
import { AccountCircle, Menu as MenuIcon } from '@material-ui/icons';
import styled from '@emotion/styled';
import NavigationDrawer from './NavigationDrawer';
import { StyledLink } from '../../components/StyledLink/StyledLink';
import { locations } from '../../contants/locations';
import { NavigationContainerProps } from './Navigation.container';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import { useColorModeContext } from '../../styles/colorModeContext';
import { ColorMode } from '../../interfaces/Styles/ColorMode';

const StyledToolbar = styled(Toolbar)`
  user-select: none;
`;

const StyledLeftIcon = styled(IconButton)`
  margin-left: auto;
`;

const StyledAppBar = styled(AppBar)`
  background: ${props =>
    props.theme.palette.type === ColorMode.Light
      ? props.theme.palette.primary.main
      : props.theme.palette.background.paper};
`;

interface Props extends NavigationContainerProps {}

const Navigation: React.FC<Props> = ({ isAuthenticated, logoutUser }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  const theme = useTheme();
  const { changeColorTheme } = useColorModeContext();
  const isUserMenuOpen = Boolean(anchorEl);

  const changeTheme = () => {
    changeColorTheme();
  };

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
      <StyledAppBar position="fixed" theme={theme}>
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
          <StyledLeftIcon color="inherit" onClick={changeTheme}>
            <InvertColorsIcon />
          </StyledLeftIcon>
          {isAuthenticated && (
            <div>
              <IconButton onClick={handleMenu} color="inherit">
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
                open={isUserMenuOpen}
                onClose={handleClose}
              >
                <StyledLink to={locations.profile}>
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                </StyledLink>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </StyledToolbar>
      </StyledAppBar>
    </nav>
  );
};

export default Navigation;

import React from 'react';
import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  Toolbar,
  useTheme,
} from '@material-ui/core';
import { AccountCircle, Menu as MenuIcon } from '@material-ui/icons';
import styled from '@emotion/styled';
import NavigationDrawer from './NavigationDrawer';
import { Routes } from '../../interfaces/Router/Routes';
import { NavigationContainerProps } from './Navigation.container';
import { useColorModeContext } from '../../styles/colorModeContext';
import { ColorTheme } from '../../interfaces/Styles/ColorTheme';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import mixins from '../../styles/mixins';
import { Link } from 'react-router-dom';

const StyledToolbar = styled(Toolbar)`
  user-select: none;
`;

const StyledAppBar = styled(AppBar)`
  background: ${props =>
    props.theme.palette.type === ColorTheme.Light
      ? props.theme.palette.primary.main
      : props.theme.palette.background.paper};
`;

const DarkModeContainer = styled.div`
  margin: 0 ${props => props.theme.spacing(2)}px 0 auto;
  ${mixins.flexCenter}
`;

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
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
      event?.type === 'keydown' &&
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
          <DarkModeContainer theme={theme}>
            <WbSunnyIcon />
            <Switch
              onChange={changeTheme}
              checked={theme.palette.type === ColorTheme.Dark}
              color="default"
              inputProps={{ 'aria-label': 'change color theme' }}
            />
            <Brightness3Icon />
          </DarkModeContainer>
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
                <StyledLink to={Routes.profile}>
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

import React from 'react';
import { ProfileContainerProps } from './Profile.container';
import UserImageForm from './UserImageForm/UserImageForm';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import PersonIcon from '@material-ui/icons/Person';
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/core';

const StyledHeader = styled.h1`
  font-weight: ${props => props.theme.fontWeights.heading};
  font-size: ${props => props.theme.fontSizes.larger}px;
  text-align: center;
`;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: ${props => props.theme.space.giga}px;
`;

interface Props extends ProfileContainerProps {}

const Profile: React.FC<Props> = ({ user, addToast }) => {
  const theme = useTheme();

  return (
    <StyledContainer theme={theme}>
      <div>
        <StyledHeader theme={theme}>Your Profile</StyledHeader>
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Login" secondary={user.login} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AlternateEmailIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Email" secondary={user.email} />
          </ListItem>
        </List>
        <UserImageForm user={user} addToast={addToast} />
      </div>
    </StyledContainer>
  );
};

export default Profile;

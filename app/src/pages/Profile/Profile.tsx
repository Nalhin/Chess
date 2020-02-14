import React from 'react';
import { ProfileContainerProps } from './Profile.container';
import UserImageForm from './UserImageForm';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import PersonIcon from '@material-ui/icons/Person';
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  useTheme,
} from '@material-ui/core';
import styled from '@emotion/styled';
import mixins from '../../styles/mixins';
import { StyledPageTitle } from '../../components/StyledPageTitle/StyledPageTitle';

const StyledContainer = styled.div`
  ${mixins.flexCenter};
  flex-direction: column;
`;

interface Props extends ProfileContainerProps {}

const Profile: React.FC<Props> = ({ user, addToast }) => {
  const theme = useTheme();

  return (
    <StyledContainer theme={theme}>
      <StyledPageTitle theme={theme} variant="h4">
        Your Profile
      </StyledPageTitle>
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
    </StyledContainer>
  );
};

export default Profile;

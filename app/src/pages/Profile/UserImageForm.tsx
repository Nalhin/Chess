import React from 'react';
import { User } from '../../interfaces/User/User';
import Loader from '../../components/Loader/Loader';
import { fetchSaveImage } from '../../store/user/user.api';
import { Avatar, Button, useTheme } from '@material-ui/core';
import styled from '@emotion/styled';
import { generateToast } from '../../utils/toastFactory';
import { Toast, ToastTypes } from '../../interfaces/Toaster/ToastTypes';
import mixins from '../../styles/mixins';

const StyledLoader = styled(Loader)`
  ${mixins.flexCenter};
  flex-direction: column;
`;

const StyledAvatar = styled(Avatar)`
  width: 200px;
  height: 200px;
`;

const StyledButton = styled(Button)`
  margin: ${props => props.theme.spacing(2)}px;
`;

interface Props {
  user: User;
  addToast: (toast: Toast) => void;
}

const UserImageForm: React.FC<Props> = ({ user, addToast }) => {
  const theme = useTheme();
  const [file, setFile] = React.useState(null);
  const [isLoading, setLoading] = React.useState(false);
  const [imageTime, setImageTime] = React.useState(new Date().getTime());

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files[0]);
  };

  const saveFile = async () => {
    setLoading(true);
    const formData = new FormData();

    formData.append('image', file);
    try {
      await fetchSaveImage(formData, user.token);
      setImageTime(new Date().getTime());
      addToast(generateToast('Image saved successfully!', ToastTypes.Success));
      setLoading(false);
      setFile(null);
    } catch (e) {
      addToast(generateToast('Uploading image failed!', ToastTypes.Error));
    }
  };

  return (
    <StyledLoader isLoading={isLoading}>
      <StyledAvatar
        src={`/assets/images/user/${user.login}.jpg?t=${imageTime}`}
        alt={user.login}
      />
      <div>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="raised-button-file"
          multiple
          type="file"
          onChange={handleFile}
        />
        <label htmlFor="raised-button-file">
          <StyledButton
            variant="contained"
            color="primary"
            // @ts-ignore
            component="span"
            theme={theme}
          >
            Change Avatar
          </StyledButton>
        </label>
        <StyledButton
          onClick={saveFile}
          color="primary"
          variant="contained"
          disabled={!file}
          theme={theme}
        >
          Save
        </StyledButton>
      </div>
    </StyledLoader>
  );
};

export default UserImageForm;

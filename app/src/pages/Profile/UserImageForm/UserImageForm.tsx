import React from 'react';
import { User } from '../../../interfaces/User';
import Loader from '../../../components/Loader/Loader';
import { fetchSaveImage } from '../../../store/user/user.api';
import Button, {
  StyledMaterialButton,
} from '../../../components/Button/Button';
import { Avatar } from '@material-ui/core';
import styled from '@emotion/styled';
import { generateToast } from '../../../utils/toastFactory';
import { Toast, ToastTypes } from '../../../interfaces/ToastTypes';
import { useTheme } from '@emotion/core';

const StyledLoader = styled(Loader)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const StyledAvatar = styled(Avatar)`
  width: 200px;
  height: 200px;
`;

interface Props {
  user: User;
  addToast: (toast: Toast) => void;
}

const UserImageForm: React.FC<Props> = ({ user, addToast }) => {
  const [file, setFile] = React.useState(null);
  const [isLoading, setLoading] = React.useState(false);
  const [imageTime, setImageTime] = React.useState(new Date().getTime());
  const theme = useTheme();

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
      addToast(generateToast('Image saved successfully!', ToastTypes.SUCCESS));
      setLoading(false);
      setFile(null);
    } catch (e) {
      addToast(generateToast('Uploading image failed!', ToastTypes.ERROR));
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
          <StyledMaterialButton
            variant="contained"
            // @ts-ignore
            component="span"
            theme={theme}
          >
            Change Avatar
          </StyledMaterialButton>
        </label>
        <Button onClick={saveFile} disabled={!file}>
          Save
        </Button>
      </div>
    </StyledLoader>
  );
};

export default UserImageForm;

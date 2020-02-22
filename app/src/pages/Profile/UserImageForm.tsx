import React from 'react';
import { User } from '../../interfaces/User/User';
import Loader from '../../components/Loader/Loader';
import { fetchSaveImage } from '../../store/user/user.api';
import { Avatar, Button, useTheme } from '@material-ui/core';
import styled from '@emotion/styled';
import { generateToast } from '../../utils/generateToast';
import { Toast, ToastTypes } from '../../interfaces/Toaster/ToastTypes';
import mixins from '../../styles/mixins';
import ButtonWithLoader from '../../components/ButtonWithLoader/ButtonWithLoader';

const StyledWrapper = styled.div`
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

const StyledInput = styled.input`
  display: none;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
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
    } catch (e) {
      addToast(
        generateToast(
          'There was a problem uploading your image!',
          ToastTypes.Error,
        ),
      );
    } finally {
      setLoading(false);
      setFile(null);
    }
  };

  const image = React.useMemo(() => file && window.URL.createObjectURL(file), [
    file,
  ]);

  return (
    <StyledWrapper>
      <StyledAvatar
        src={image ?? `/assets/images/user/${user.login}.jpg?t=${imageTime}`}
        alt={user.login}
      />
      <StyledButtonContainer>
        <StyledInput
          accept="image/*"
          id="button-file"
          multiple
          type="file"
          onChange={handleFile}
        />
        <label htmlFor="button-file">
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
        <ButtonWithLoader
          onClick={saveFile}
          disabled={!file}
          isLoading={isLoading}
        >
          Save
        </ButtonWithLoader>
      </StyledButtonContainer>
    </StyledWrapper>
  );
};

export default UserImageForm;

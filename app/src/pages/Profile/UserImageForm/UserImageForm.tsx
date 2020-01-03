import React from 'react';
import { User } from '../../../interfaces/User';
import Loader from '../../../components/Loader/Loader';
import { fetchSaveImage } from '../../../store/user/user.api';

interface Props {
  user: User;
}

const UserImageForm: React.FC<Props> = ({ user }) => {
  const [file, setFile] = React.useState();
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
      setLoading(false);
    } catch (e) {}
  };

  return (
    <Loader isLoading={isLoading}>
      <img
        src={`/assets/images/user/${user.login}.jpg?t=${imageTime}`}
        alt={user.login}
      />
      <input type="file" name="myFile" onChange={handleFile} />
      <button type="submit" onClick={saveFile}>
        Save
      </button>
    </Loader>
  );
};

export default UserImageForm;

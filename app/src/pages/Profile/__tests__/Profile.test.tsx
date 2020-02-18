import { render } from '@testing-library/react';
import React from 'react';
import Profile from '../Profile';
import { fakeUser } from '../../../../test/fixtures/user/user';

const props = {
  user: fakeUser,
  addToast: jest.fn(),
};

describe('Profile page', () => {
  it('should display user data', () => {
    const { getByText } = render(<Profile user={fakeUser} {...props} />);

    expect(getByText(fakeUser.login)).toBeInTheDocument();
    expect(getByText(fakeUser.email)).toBeInTheDocument();
  });
});

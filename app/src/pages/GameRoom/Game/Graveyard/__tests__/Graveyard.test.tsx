import { fakePiece } from '../../../../../../test/fixtures/game/piece';
import { render } from '@testing-library/react';
import Graveyard from '../Graveyard';
import React from 'react';

const props = {
  description: '',
  pieces: [fakePiece],
};

describe('Graveyard component', () => {
  it('should render pieces', () => {
    const pieces = [fakePiece];
    const { getByAltText } = render(<Graveyard {...props} pieces={pieces} />);

    expect(getByAltText(new RegExp(fakePiece.type))).toBeInTheDocument();
  });
});

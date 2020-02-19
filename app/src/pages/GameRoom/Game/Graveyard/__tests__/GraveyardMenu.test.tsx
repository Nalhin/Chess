import { PlayerColor } from '../../../../../interfaces/Game/Player';
import { fakePiece } from '../../../../../../test/fixtures/game/fakePiece';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import GraveyardMenu from '../GraveyardMenu';

const props = {
  userColor: PlayerColor.White,
  graveyards: {
    whiteGraveyard: [fakePiece, fakePiece],
    blackGraveyard: [fakePiece],
  },
};

describe('GraveyardMenu component', () => {
  it('should display number pieces in own graveyard', () => {
    const { getByText } = render(<GraveyardMenu {...props} />);

    expect(getByText(/2/)).toBeInTheDocument();
  });
  it('should open on click', () => {
    const { getByLabelText, getAllByAltText } = render(
      <GraveyardMenu {...props} />,
    );

    fireEvent.click(getByLabelText(/open graveyard/i));

    expect(getAllByAltText(new RegExp(fakePiece.type))[0]).toBeInTheDocument();
  });
});

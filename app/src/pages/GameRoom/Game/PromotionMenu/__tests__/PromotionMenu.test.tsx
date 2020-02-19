import { PlayerColor } from '../../../../../interfaces/Game/Player';
import { fakeBoardPosition } from '../../../../../../test/fixtures/game/fakeBoardPosition';
import { fireEvent, render } from '@testing-library/react';
import PromotionMenu from '../PromotionMenu';
import React from 'react';

const props = {
  playerColor: PlayerColor.White,
  positionAwaitingPromotion: fakeBoardPosition,
  promotePawn: jest.fn(),
  isShown: true,
};

describe('PromotionMenu component', () => {
  it('should allow promotion piece', () => {
    const testProps = {
      promotePawn: jest.fn(),
      isShown: true,
    };

    const { getByAltText } = render(
      <PromotionMenu {...props} {...testProps} />,
    );

    fireEvent.click(getByAltText(/queen/i));

    expect(testProps.promotePawn).toHaveBeenCalledTimes(1);
  });
});

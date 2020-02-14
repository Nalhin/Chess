import { css, SerializedStyles, Theme } from '@emotion/core';

interface Props {
  theme?: Theme;
}

const cellSizes = {
  desktop: '5rem',
  tablet: '3.5rem',
  mobile: '2.5rem',
};

export const getCellSize = (props: Props): SerializedStyles => {
  return css`
    width: ${cellSizes.desktop};
    height: ${cellSizes.desktop};

    ${props.theme.breakpoints.down('md')} {
      width: ${cellSizes.tablet};
      height: ${cellSizes.tablet};
    }

    ${props.theme.breakpoints.down('sm')} {
      width: ${cellSizes.mobile};
      height: ${cellSizes.mobile};
    }
  `;
};

const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const absoluteCenter = css`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const fixedCenter = css`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

export default {
  flexCenter,
  absoluteCenter,
  fixedCenter,
  getCellSize,
};

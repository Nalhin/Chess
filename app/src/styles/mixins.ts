import { css } from '@emotion/core';

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
};

import styled from '@emotion/styled';
import { Button } from '@material-ui/core';
import mixins from '../../../styles/mixins';

export const StyledQueueButton = styled(Button)`
  margin: ${props => props.theme.spacing(2)}px;
`;

export const StyledQueueContainer = styled.div`
  ${mixins.flexCenter};
  flex-direction: column;
`;

import { AppState } from '../rootReducer';

export const shouldDisplayBack = (state: AppState, path: string) =>
  state.customRouter.previousLocations.length > 2 &&
  state.customRouter.previousLocations[
    state.customRouter.previousLocations.length - 2
  ].pathname === path;

export const didRouteChange = (state: AppState) => {
  const length = state.customRouter.previousLocations.length;
  if (length < 2) {
    return false;
  }
  return (
    state.customRouter.previousLocations[length - 1].pathname !==
    state.customRouter.previousLocations[length - 2].pathname
  );
};

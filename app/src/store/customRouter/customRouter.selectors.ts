import { AppState } from '../rootReducer';

export const shouldDisplayBack = (state: AppState, path: string) =>
  state.customRouter.previousLocations.length > 2 &&
  state.customRouter.previousLocations[
    state.customRouter.previousLocations.length - 2
  ].pathname === path;

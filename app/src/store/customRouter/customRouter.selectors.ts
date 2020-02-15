import { AppState } from '../rootReducer';
import { createSelector } from 'reselect';

const previousLocationsSelector = (state: AppState) =>
  state.customRouter.previousLocations;

export const shouldDisplayBackSelector = (path: string) =>
  createSelector(
    previousLocationsSelector,
    previousLocations =>
      previousLocations.length >= 2 &&
      previousLocations[previousLocations.length - 2].pathname === path,
  );

export const didRouteChangeSelector = createSelector(
  previousLocationsSelector,
  previousLocations => {
    const length = previousLocations.length;
    if (length < 2) {
      return false;
    }
    return (
      previousLocations[length - 1].pathname !==
      previousLocations[length - 2].pathname
    );
  },
);

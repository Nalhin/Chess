import { Hash, LocationKey, LocationState, Pathname, Search } from 'history';

interface Location<S = LocationState> {
  pathname: Pathname;
  search: Search;
  state: S;
  hash: Hash;
  key?: LocationKey;
}

export interface CustomRouterState {
  readonly previousLocations: Location[];
}

export enum CustomRouterActionTypes {
  LOCATION_CHANGE = '@@router/LOCATION_CHANGE',
}

export interface CustomRouterLocationChangeAction {
  type: CustomRouterActionTypes.LOCATION_CHANGE;
}

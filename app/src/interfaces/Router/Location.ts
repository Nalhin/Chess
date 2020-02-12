import { Hash, LocationKey, LocationState, Pathname, Search } from 'history';

export interface Location<S = LocationState> {
  pathname: Pathname;
  search: Search;
  state: S;
  hash: Hash;
  key?: LocationKey;
}

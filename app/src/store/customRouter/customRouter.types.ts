import { LocationChangeAction } from 'connected-react-router';
import { Location } from '../../interfaces/Router/Location';

export interface CustomRouterState {
  readonly previousLocations: Location[];
}

export enum CustomRouterActionTypes {
  LOCATION_CHANGE = '@@router/LOCATION_CHANGE',
}

export type CustomRouterActions = LocationChangeAction;

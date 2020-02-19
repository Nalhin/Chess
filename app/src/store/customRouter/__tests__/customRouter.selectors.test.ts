import {
  didRouteChangeSelector,
  shouldDisplayBackSelector,
} from '../customRouter.selectors';
import { fakeLocation } from '../../../../test/fixtures/router/fakeLocation';

describe('shouldDisplayBack', () => {
  it('should be truthy, if prev location is different', () => {
    const pathname = 'yes';
    const fakeLocations = [
      { ...fakeLocation },
      { ...fakeLocation, pathname },
      { ...fakeLocation },
    ];

    const selector = shouldDisplayBackSelector(pathname).resultFunc(
      fakeLocations,
    );

    expect(selector).toBeTruthy();
  });
  it('should be falsy, if prev location is not different', () => {
    const pathname = 'no';
    const fakeLocations = [
      { ...fakeLocation },
      { ...fakeLocation },
      { ...fakeLocation, pathname },
    ];

    const selector = shouldDisplayBackSelector(pathname).resultFunc(
      fakeLocations,
    );

    expect(selector).toBeFalsy();
  });
});

describe('didRouteChange', () => {
  it('should be truthy if route changed', () => {
    const fakeLocations = [
      { ...fakeLocation },
      { ...fakeLocation },
      { ...fakeLocation, pathname: 'changed' },
    ];

    const selector = didRouteChangeSelector.resultFunc(fakeLocations);

    expect(selector).toBeTruthy();
  });

  it('should be falsy if route did not change', () => {
    const fakeLocations = [
      { ...fakeLocation },
      { ...fakeLocation },
      { ...fakeLocation },
    ];

    const selector = didRouteChangeSelector.resultFunc(fakeLocations);

    expect(selector).toBeFalsy();
  });
});

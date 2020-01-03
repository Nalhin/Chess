import ErrorBoundary from '../ErrorBoundary';
import * as React from 'react';
import { cleanup, render } from '@testing-library/react';

const ErrorComponent = ({ withError }: { withError?: boolean }): null => {
  if (withError) throw new Error();
  return null;
};

jest.spyOn(console, 'error').mockImplementation(() => {});

describe('ErrorBoundary Component', () => {
  afterEach(cleanup);

  it('Should behave normally without errors', () => {
    const { queryByTestId } = render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>,
    );

    const error = queryByTestId('error-boundary');

    expect(error).toBeFalsy();
  });

  it('Should react to error', () => {
    const { getByTestId } = render(
      <ErrorBoundary>
        <ErrorComponent withError />
      </ErrorBoundary>,
    );

    const error = getByTestId('error-boundary');

    expect(error).toBeTruthy();
  });
});

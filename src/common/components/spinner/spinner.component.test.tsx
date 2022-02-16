import * as React from 'react';
import {
  render,
  screen,
  act,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { SpinnerComponent } from './spinner.component';
import { trackPromise } from 'react-promise-tracker';

//utility to programatically resolve a promise
function deferred() {
  let resolve, rejected;
  const promise = new Promise((res, rej) => {
    resolve = res;
    rejected = rej;
  });
  return { promise, resolve, rejected };
}

describe('spinner.component', () => {
  it('should not render modal before promise if a promise is not provided to track Promise', () => {
    render(<SpinnerComponent />);
    expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
  });

  it('should show modal while promise is in progress', async () => {
    const { promise, resolve } = deferred();
    render(<SpinnerComponent />);
    let p;
    act(() => {
      p = trackPromise(promise);
    });
    expect(screen.getByRole('presentation')).toBeInTheDocument();
    expect(screen.getByRole('presentation')).toBeVisible();
    //solve promise to trackPromise not affect rest of test
    await act(async () => {
      resolve();
      await p;
    });
  });

  it('modal should be removed after promise is resolved', async () => {
    const { promise, resolve } = deferred();
    render(<SpinnerComponent />);
    act(() => {
      trackPromise(promise);
    });
    expect(screen.getByRole('presentation')).toBeInTheDocument();
    expect(screen.getByRole('presentation')).toBeVisible();
    resolve();
    await waitForElementToBeRemoved(() => screen.queryByRole('presentation'));
  });

  it('modal should be removed after promise is rejected', async () => {
    const { promise, rejected } = deferred();
    render(<SpinnerComponent />);
    act(() => {
      trackPromise(promise);
    });
    expect(screen.getByRole('presentation')).toBeInTheDocument();
    expect(screen.getByRole('presentation')).toBeVisible();
    rejected();
    await waitForElementToBeRemoved(() => screen.queryByRole('presentation'));
  });
});

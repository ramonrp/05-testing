import * as React from 'react';
import {
  render,
  screen,
  act,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { SpinnerComponent } from './spinner.component';
import { trackPromise } from 'react-promise-tracker';

function createPromiseDelay({ delay = 100, willResolve = true } = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (willResolve) resolve('promise resolved');
      else reject('promise rejected');
    }, delay);
  });
}

describe('spinner.component', () => {
  it('should not render modal before promise is created', () => {
    render(<SpinnerComponent />);
    expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
  });

  it('should show modal while promise is in progress', () => {
    render(<SpinnerComponent />);
    act(() => {
      trackPromise(createPromiseDelay());
    });
    screen.debug();
    expect(screen.getByRole('presentation')).toBeInTheDocument();
    expect(screen.getByRole('presentation')).toBeVisible();
  });

  it('modal should be removed after promise is resolved', async () => {
    render(<SpinnerComponent />);
    act(() => {
      trackPromise(createPromiseDelay());
    });

    await waitForElementToBeRemoved(() => screen.queryByRole('presentation'));
  });

  it('modal should be removed after promise is rejected', async () => {
    render(<SpinnerComponent />);
    act(() => {
      trackPromise(createPromiseDelay({ willResolve: false }));
    });

    await waitForElementToBeRemoved(() => screen.queryByRole('presentation'));
  });
});

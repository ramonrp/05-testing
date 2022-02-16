import * as React from 'react';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('ConfirmationDialogComponent component', () => {
  afterEach(() => jest.clearAllMocks());
  const props = {
    isOpen: true,
    onAccept: jest.fn(),
    onClose: jest.fn(),
    title: 'Test Title',
    labels: {
      closeButton: 'close button',
      acceptButton: 'accept button',
    },
    children: <p data-testid="test-children">Test Children</p>,
  };

  const setup = ({ isOpen = true } = {}) => {
    const view = render(
      <ConfirmationDialogComponent {...props} isOpen={isOpen} />
    );
    return {
      ...view,
    };
  };
  it("shouldn't display anything if isOpen=false and show dialog when isOpen=true", () => {
    const { rerender } = setup({ isOpen: false });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    rerender(<ConfirmationDialogComponent {...props} />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toBeVisible();
  });

  it('should display title text, button accept text and button close text', () => {
    setup();
    expect(screen.getByRole('presentation')).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: props.labels.closeButton })
    ).toHaveTextContent(props.labels.closeButton);

    expect(
      screen.getByRole('button', { name: props.labels.acceptButton })
    ).toHaveTextContent(props.labels.acceptButton);

    expect(
      screen.getByRole('button', { name: props.labels.acceptButton })
    ).toHaveTextContent(props.labels.acceptButton);

    expect(
      screen.getByRole('heading', { name: props.title })
    ).toHaveTextContent(props.title);
  });

  it('should call on onAccept and onClose when accept button is clicked', () => {
    setup();
    const acceptButton = screen.getByRole('button', {
      name: props.labels.acceptButton,
    });
    userEvent.click(acceptButton);
    expect(props.onAccept).toHaveBeenCalledTimes(1);
    expect(props.onAccept).toHaveBeenCalledTimes(1);
  });

  it('should call on closeButton when accept button is clicked', () => {
    setup();
    const closeButton = screen.getByRole('button', {
      name: props.labels.closeButton,
    });
    userEvent.click(closeButton);
    expect(props.onClose).toHaveBeenCalledTimes(1);
  });

  it('should display children prop inside dialog when isOpen prop is true', () => {
    setup();
    const dialog = screen.getByRole('dialog');
    const children = within(dialog).getByTestId('test-children');
    expect(children).toBeInTheDocument();
  });
});

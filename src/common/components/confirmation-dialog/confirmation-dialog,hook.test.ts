import { renderHook, act } from '@testing-library/react-hooks';
import { Lookup } from 'common/models';
import { useConfirmationDialog } from './confirmation-dialog.hook';
describe('confirmation-dialog.hook.ts', () => {
  const emptyLookup: Lookup = {
    id: '',
    name: '',
  };
  const testItem: Lookup = {
    id: '5',
    name: 'test',
  };
  it('should return isOpen false by default', () => {
    const { result } = renderHook(useConfirmationDialog);
    expect(result.current.isOpen).toEqual(false);
  });
  it('should return itemToDelete as an object with Lookup interface empty', () => {
    const { result } = renderHook(useConfirmationDialog);
    expect(result.current.itemToDelete).toEqual(emptyLookup);
  });
  it('should return onOpenDialog(item) function. This function should set isOpen to true and itemToDelete as same item of argument passed', () => {
    const { result } = renderHook(useConfirmationDialog);
    expect(result.current.onOpenDialog).toEqual(expect.any(Function));
    act(() => result.current.onOpenDialog(testItem));
    expect(result.current.isOpen).toEqual(true);
    expect(result.current.itemToDelete).toEqual(testItem);
  });

  it('should return onClose function. This function should set isOpen to false', () => {
    const { result } = renderHook(useConfirmationDialog);
    expect(result.current.onClose).toEqual(expect.any(Function));
    act(() => result.current.onOpenDialog(testItem));
    act(() => result.current.onClose());
    expect(result.current.isOpen).toEqual(false);
  });

  it('should return onAccept function. This function should set itemToDelete to empty Lookup', () => {
    const { result } = renderHook(useConfirmationDialog);
    expect(result.current.onAccept).toEqual(expect.any(Function));
    act(() => result.current.onOpenDialog(testItem));
    act(() => result.current.onAccept());
    expect(result.current.itemToDelete).toEqual(emptyLookup);
  });
});

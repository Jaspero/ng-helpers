import { ArrayFromObjectPipe } from './array-from-object.pipe';

describe('ArrayFromObjectPipe', () => {
  it('create an instance', () => {
    const pipe = new ArrayFromObjectPipe();
    expect(pipe).toBeTruthy();
  });
});

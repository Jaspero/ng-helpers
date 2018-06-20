import { TimePassedPipe } from './time-passed.pipe';

describe('TimePassedPipe', () => {
  it('create an instance', () => {
    const pipe = new TimePassedPipe();
    expect(pipe).toBeTruthy();
  });
});

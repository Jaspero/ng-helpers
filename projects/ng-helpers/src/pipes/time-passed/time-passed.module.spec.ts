import {TimePassedModule} from './time-passed.module';

describe('TimePassedModule', () => {
  let sanitizeModule: TimePassedModule;

  beforeEach(() => {
    sanitizeModule = new TimePassedModule();
  });

  it('should create an instance', () => {
    expect(sanitizeModule).toBeTruthy();
  });
});

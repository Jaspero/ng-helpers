import { DebounceChangeModule } from './debounce-change.module';

describe('DebounceChangeModule', () => {
  let debounceChangeModule: DebounceChangeModule;

  beforeEach(() => {
    debounceChangeModule = new DebounceChangeModule();
  });

  it('should create an instance', () => {
    expect(debounceChangeModule).toBeTruthy();
  });
});

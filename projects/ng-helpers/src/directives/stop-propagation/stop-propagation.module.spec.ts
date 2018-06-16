import { StopPropagationModule } from './stop-propagation.module';

describe('StopPropagationModule', () => {
  let stopPropagationModule: StopPropagationModule;

  beforeEach(() => {
    stopPropagationModule = new StopPropagationModule();
  });

  it('should create an instance', () => {
    expect(stopPropagationModule).toBeTruthy();
  });
});

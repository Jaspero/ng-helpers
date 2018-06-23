import { ArrayFromObjectModule } from './array-from-object.module';

describe('ArrayFromObjectModule', () => {
  let arrayFromObjectModule: ArrayFromObjectModule;

  beforeEach(() => {
    arrayFromObjectModule = new ArrayFromObjectModule();
  });

  it('should create an instance', () => {
    expect(arrayFromObjectModule).toBeTruthy();
  });
});

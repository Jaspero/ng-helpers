import { ClickOutsideModule } from './click-outside.module';

describe('ClickOutsideModule', () => {
  let clickOutsideModule: ClickOutsideModule;

  beforeEach(() => {
    clickOutsideModule = new ClickOutsideModule();
  });

  it('should create an instance', () => {
    expect(clickOutsideModule).toBeTruthy();
  });
});

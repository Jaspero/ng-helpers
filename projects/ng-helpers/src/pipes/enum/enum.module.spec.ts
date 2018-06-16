import { EnumModule } from './enum.module';

describe('EnumModule', () => {
  let enumModule: EnumModule;

  beforeEach(() => {
    enumModule = new EnumModule();
  });

  it('should create an instance', () => {
    expect(enumModule).toBeTruthy();
  });
});

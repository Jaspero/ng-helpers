import { EnumKeyFormatModule } from './enum-key-format.module';

describe('EnumKeyFormatModule', () => {
  let enumKeyFormatModule: EnumKeyFormatModule;

  beforeEach(() => {
    enumKeyFormatModule = new EnumKeyFormatModule();
  });

  it('should create an instance', () => {
    expect(enumKeyFormatModule).toBeTruthy();
  });
});

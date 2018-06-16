import { SanitizeModule } from './sanitize.module';

describe('SanitizeModule', () => {
  let sanitizeModule: SanitizeModule;

  beforeEach(() => {
    sanitizeModule = new SanitizeModule();
  });

  it('should create an instance', () => {
    expect(sanitizeModule).toBeTruthy();
  });
});

import { FormTouchOnHoverModule } from './form-touch-on-hover.module';

describe('FormTouchOnHoverModule', () => {
  let formTouchOnHoverModule: FormTouchOnHoverModule;

  beforeEach(() => {
    formTouchOnHoverModule = new FormTouchOnHoverModule();
  });

  it('should create an instance', () => {
    expect(formTouchOnHoverModule).toBeTruthy();
  });
});

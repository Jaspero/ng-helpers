import {TrackByFieldModule} from './track-by-field.module';

describe('TrackByFieldModule', () => {
  let ngForTrackByFieldModule: TrackByFieldModule;

  beforeEach(() => {
    ngForTrackByFieldModule = new TrackByFieldModule();
  });

  it('should create an instance', () => {
    expect(ngForTrackByFieldModule).toBeTruthy();
  });
});

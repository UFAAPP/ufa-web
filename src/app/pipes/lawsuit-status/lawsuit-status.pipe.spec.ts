import { LawsuitStatusPipe } from './lawsuit-status.pipe';

describe('LawsuitStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new LawsuitStatusPipe();
    expect(pipe).toBeTruthy();
  });
});

import { CustomDateFormatPipe } from './pie.pipe';

describe('PiePipe', () => {
  it('create an instance', () => {
    const pipe = new CustomDateFormatPipe();
    expect(pipe).toBeTruthy();
  });
});

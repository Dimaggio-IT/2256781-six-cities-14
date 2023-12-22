import { parseLengthAndUnit, cssValue } from './helpers/unitConverter';

describe('parseLengthAndUnit', () => {
  it('should return a LengthObject with default unit "px" for numeric input', () => {
    expect(parseLengthAndUnit(10)).toEqual({ value: 10, unit: 'px' });
  });

  it('should return a LengthObject with valid unit for valid string input', () => {
    expect(parseLengthAndUnit('20rem')).toEqual({ value: 20, unit: 'rem' });
    expect(parseLengthAndUnit('5vh')).toEqual({ value: 5, unit: 'vh' });
  });

  it('should return a LengthObject with default unit "px" for invalid string input', () => {
    expect(parseLengthAndUnit('abc')).toEqual({ value: NaN, unit: 'px' });
    expect(parseLengthAndUnit('50foo')).toEqual({ value: 50, unit: 'px' });
  });
});

describe('cssValue', () => {
  it('should return a valid CSS value string for numeric input', () => {
    expect(cssValue(10)).toBe('10px');
  });

  it('should return a valid CSS value string for string input', () => {
    expect(cssValue('20rem')).toBe('20rem');
    expect(cssValue('5vh')).toBe('5vh');
  });

  it('should handle invalid input and return a valid CSS value string with default unit "px"', () => {
    expect(cssValue('abc')).toBe('NaNpx');
    expect(cssValue('50foo')).toBe('50px');
  });
});

import { isEmptyString } from "./main";

describe('isEmptyString function', () => {
  it('should return true for an empty string', () => {
    expect(isEmptyString("")).toBe(true);
  });

  it('should return true for a string with only half-width whitespace characters', () => {
    expect(isEmptyString("    ")).toBe(true);
  });

  it('should return true for a string with only full-width whitespace characters', () => {
    expect(isEmptyString("　　　　")).toBe(true);
  });

  it('should return true for a string with only whitespace characters including both full-width and half-width', () => {
    expect(isEmptyString("　　   ")).toBe(true);
  });

  it('should return false for a non-empty string', () => {
    expect(isEmptyString("hello")).toBe(false);
  });

  it('should return false for a string with half-width whitespaces in the middle', () => {
    expect(isEmptyString("hello world")).toBe(false);
  });

  it('should return false for a string with leading or trailing half-width whitespaces', () => {
    expect(isEmptyString("  hello  ")).toBe(false);
  });

  it('should return false for a string with leading or trailing full-width whitespaces', () => {
    expect(isEmptyString("　　hello　　")).toBe(false);
  });
});

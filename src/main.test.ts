import { createUrl, isEmptyString } from "./main";

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


describe('createUrl function', () => {
  it('should generate the correct URL with a search word', () => {
    const searchWord = 'test';
    const expectedUrl = 'https://www.google.com/search?q=test+site%3Atopaz.dev';
    expect(createUrl(searchWord)).toBe(expectedUrl);
  });

  it('should handle special characters in search word', () => {
    const searchWord = 'hello world';
    const expectedUrl = 'https://www.google.com/search?q=hello%20world+site%3Atopaz.dev';
    expect(createUrl(searchWord)).toBe(expectedUrl);
  });

  it('should handle Japanese characters in search word', () => {
    const searchWord = '検索テスト';
    const expectedUrl = 'https://www.google.com/search?q=%E6%A4%9C%E7%B4%A2%E3%83%86%E3%82%B9%E3%83%88+site%3Atopaz.dev';
    expect(createUrl(searchWord)).toBe(expectedUrl);
  });

  it('should handle empty search word', () => {
    const searchWord = '';
    const expectedUrl = 'https://www.google.com/search?q=+site%3Atopaz.dev';
    expect(createUrl(searchWord)).toBe(expectedUrl);
  });
});

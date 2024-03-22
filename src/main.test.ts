import { createUrl, openUrl } from "./main";

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

  it('should return undefined with empty search word', () => {
    const searchWord = '';
    expect(createUrl(searchWord)).toBeUndefined();
  });

  it('should return undefined with half-width whitespace', () => {
    const searchWord = '  ';
    expect(createUrl(searchWord)).toBeUndefined();
  });

  it('should return undefined with full-width whitespace', () => {
    const searchWord = '　　';
    expect(createUrl(searchWord)).toBeUndefined();
  });
});

describe('openUrl function', () => {
  it('open passed url', () => {
    global.window = Object.create(window);
    Object.defineProperty(window, 'location', {
      value: {
        href: '',
        pathname: '/',
        search: '',
        hostname: '',
      },
    });
    expect(openUrl("https://example.com")).toEqual("https://example.com");
    expect(window.location.href).toEqual("https://example.com");
  });

  it('should handle errors and throw them with a new Error object', () => {
    Object.defineProperty(window.location, 'href', {
      configurable: true,
      get: () => { throw new Error('Failed to open URL'); }
    });
    expect(openUrl("https://example.com")).toBeUndefined();
  });
});

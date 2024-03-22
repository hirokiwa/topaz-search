import './style.css'

const handleSearch = () => {
  const nameText = selectQuery.input("#nameText");
  const inputValue = nameText?.value ?? "";
  const url = isEmptyString(inputValue) ? undefined : createUrl(inputValue);
  url && openUrl(url);
}

export const isEmptyString = (input: string) => input.trim() === "";
export const createUrl = (searchWord: string) => {
  const encodedSearchWord = encodeURI(searchWord);
  return `https://www.google.com/search?q=${encodedSearchWord}+site%3Atopaz.dev`
};

const selectQuery = {
  input: (selector: string) => {
    try {
      return document.querySelector<HTMLInputElement>(selector);
    } catch (e) {
      console.error(e, "Faild to select query");
      return null;
    }
  },
  button: (selector: string) => {
    try {
      return document.querySelector<HTMLButtonElement>(selector);
    } catch (e) {
      console.error(e, "Faild to select query");
      return null;
    }
  },
}

export const openUrl = (url: string) => {
  try {
    window.location.href = url;
  } catch (e) {
    console.error(e, "Failed to open URL.");
  }
}

const checkButton = selectQuery.button('#checkButton');
checkButton?.addEventListener('click', handleSearch);

const handleSearch = () => {
  const inputValue = getInputValue();
  const url = isEmptyString(inputValue) ? undefined : createUrl(inputValue);
  url && openUrl(url);
}

const getInputValue = () => {
  const inputElement = selectQuery.input("#nameText");
  return inputElement?.value ?? "";
}

export const isEmptyString = (input: string) => input.trim() === "";
export const createUrl = (searchWord: string) => {
  const encodedSearchWord = encodeURI(searchWord);
  return `https://www.google.com/search?q=${encodedSearchWord}+site%3Atopaz.dev`
};

const selectQuery = {
  input: (selector: string) => {
    try {
      return document.querySelector<HTMLInputElement>(selector) ?? undefined;
    } catch (e) {
      console.error(e, "Faild to select query");
      return undefined;
    }
  },
  button: (selector: string) => {
    try {
      return document.querySelector<HTMLButtonElement>(selector) ?? undefined;
    } catch (e) {
      console.error(e, "Faild to select query");
      return undefined;
    }
  },
}

export const openUrl = (url: string) => {
  try {
    window.location.href = url;
    return url;
  } catch (e) {
    console.error(e, "Failed to open URL.");
    return undefined;
  }
}

const checkButton = selectQuery.button('#checkButton');
checkButton?.addEventListener('click', handleSearch);

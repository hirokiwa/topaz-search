const handleSearch = () => {
  const inputValue = getInputValue();
  const url = createUrl(inputValue);
  url && openUrl(url);
};

const getInputValue = () => {
  const inputElement = selectQuery.input("#topazSearchWord");
  return inputElement?.value ?? "";
};

export const createUrl = (input: string) => {
  const isEmptyString = input.trim() === "";
  return isEmptyString ? undefined :
    `https://www.google.com/search?q=${encodeURI(input)}+site%3Atopaz.dev`;
}

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
};

export const openUrl = (url: string) => {
  try {
    window.location.href = url;
    return url;
  } catch (e) {
    console.error(e, "Failed to open URL.");
    return undefined;
  }
};

const inputElement = selectQuery.input("#topazSearchWord");
inputElement?.addEventListener("keypress", (e: KeyboardEvent) => { e.key === "Enter" && handleSearch()});

const handleSearch = () => {
  const inputValue = getInputValue();
  const url = createUrl(inputValue);
  const openedUrl = url && openUrl(url);
  openedUrl && inputElement?.removeEventListener('input', handleInputSearchWord);
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
  div: (selector: string) => {
    try {
      return document.querySelector<HTMLDivElement>(selector) ?? undefined;
    } catch (e) {
      console.error(e, "Faild to select query");
      return undefined;
    }
  },
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

const handleClickClearSearchButton = () => {
  handleActiveClearButton.unactive();
  replaceSearchParam("");
  inputElement?.focus();
};

const handleActiveClearButton = {
  active: () => {
    if(clearSearchButtonWrapper){
      clearSearchButton?.addEventListener('click', handleClickClearSearchButton);
      clearSearchButtonWrapper.style.display = "flex";
    };
  },
  unactive: () => {
    if(clearSearchButtonWrapper){
      clearSearchButton?.removeEventListener('click', handleClickClearSearchButton);
      clearSearchButtonWrapper.style.display = "none";
    };
  },
};

const handleInputSearchWord = (event: Event) => {
  const target = event.target instanceof HTMLInputElement ? event.target : undefined;
  const activateButton = target && target.value !== "";
  activateButton ? handleActiveClearButton.active() : handleActiveClearButton.unactive();
  const inputValue = target?.value ?? "";
  replaceSearchParam(inputValue);
};

const replaceSearchParam = (inputValue: string) => {
  try {
    const newState = inputValue === "" ? "/" : `?q=${(inputValue)}`;
    history.replaceState('','',newState);
  } catch (e) {
    console.error(e, "Faild to replace state.");
  }
}

const clearSearchButtonWrapper = selectQuery.div("#clearSearchButtonWrapper");
const clearSearchButton = selectQuery.input("#clearSearchButton");
const inputElement = selectQuery.input("#topazSearchWord");

inputElement?.focus();

inputElement?.addEventListener("keypress", (e: KeyboardEvent) => { e.key === "Enter" && handleSearch()});
inputElement?.addEventListener('input', handleInputSearchWord);

const params = new URLSearchParams(document.location.search);
const currentInput = params.get("q");

if(currentInput && inputElement){
  inputElement.value = currentInput;
  handleActiveClearButton.active();
}

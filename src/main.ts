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
  body: (selector: string) => {
    try {
      return document.querySelector<HTMLBodyElement>(selector) ?? undefined;
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
const bodyElement = selectQuery.body("#body");

const handleKeyDownInputWithoutEnter = (e: KeyboardEvent) => {
  e.key === "Escape" && inputElement?.blur();
};
const handleKeyDownInput = (e: KeyboardEvent) => {
  e.key === "Enter" && handleSearch();
  e.key === "Escape" && inputElement?.blur();
};
const handleKeyDownDoby = (e: KeyboardEvent) => {
  e.key === "/" && inputElement?.focus();
  e.key === "/" && bodyElement?.removeEventListener("keydown", handleKeyDownDoby);
}

const handleCompositionStart = () => {
  inputElement?.removeEventListener("keydown", handleKeyDownInput);
  inputElement?.addEventListener("keydown", handleKeyDownInputWithoutEnter);
  inputElement?.addEventListener("compositionend", handleCompositionEnd, {once: true});
};
const handleCompositionEnd = () => {
  inputElement?.removeEventListener("keydown", handleKeyDownInputWithoutEnter);
  inputElement?.addEventListener("keydown", handleKeyDownInput);
  inputElement?.addEventListener("compositionstart", handleCompositionStart, {once: true});
};

const handleFocusSearchInput = () => {
  inputElement?.addEventListener("compositionstart", handleCompositionStart, {once: true});
  inputElement?.addEventListener("keydown", handleKeyDownInput);
  inputElement?.addEventListener('input', handleInputSearchWord);
  inputElement?.addEventListener("blur", handleBlurSearchInput, {once: true});
}
const handleBlurSearchInput = () => {
  inputElement?.removeEventListener("compositionstart", handleCompositionStart);
  inputElement?.removeEventListener("compositionend", handleCompositionEnd);
  inputElement?.removeEventListener("keydown", handleKeyDownInput);
  inputElement?.removeEventListener("keydown", handleKeyDownInputWithoutEnter);
  inputElement?.removeEventListener('input', handleInputSearchWord);
  inputElement?.addEventListener("focus", handleFocusSearchInput, {once: true});
  bodyElement?.addEventListener("keydown", handleKeyDownDoby);
}

inputElement?.addEventListener("focus", handleFocusSearchInput, {once: true});
inputElement?.focus();


const params = new URLSearchParams(document.location.search);
const currentInput = params.get("q");

if(currentInput && inputElement){
  inputElement.value = currentInput;
  handleActiveClearButton.active();
}

bodyElement?.addEventListener("keydown", handleKeyDownDoby);

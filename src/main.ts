const handleSearch = () => {
  const inputValue = getInputValue();
  const url = createUrl(inputValue);
  const openedUrl = url && openUrl(url);
  openedUrl && searchInputElement?.removeEventListener('input', handleInputSearchWord);
  openedUrl && replaceSearchParam(inputValue);
};

const getInputValue = () => {
  const searchInputElement = selectQuery.input("#topazSearchWord");
  return searchInputElement?.value ?? "";
};

export const createUrl = (input: string) => {
  const isEmptyString = input.trim() === "";
  return isEmptyString ? undefined :
    `https://www.google.com/search?q=site%3Atopaz.dev+${encodeURI(input)}`;
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
  searchInputElement?.focus();
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
};

const replaceSearchParam = (inputValue: string) => {
  try {
    const newState = inputValue === "" ? "/" : `?q=${(inputValue)}`;
    history.replaceState('','',newState);
  } catch (e) {
    console.error(e, "Faild to replace state.");
  };
};

const clearSearchButtonWrapper = selectQuery.div("#clearSearchButtonWrapper");
const clearSearchButton = selectQuery.input("#clearSearchButton");
const searchInputElement = selectQuery.input("#topazSearchWord");
const bodyElement = selectQuery.body("#body");

const handleKeyDownInputWithoutEnter = (e: KeyboardEvent) => {
  e.key === "Escape" && searchInputElement?.blur();
};
const handleKeyDownInput = (e: KeyboardEvent) => {
  e.key === "Enter" && handleSearch();
  e.key === "Escape" && searchInputElement?.blur();
};
const handleKeyDownDoby = (e: KeyboardEvent) => {
  if(e.key === "/"){
    e.preventDefault();
    bodyElement?.removeEventListener("keydown", handleKeyDownDoby);
    searchInputElement?.focus();
  };
};

const handleCompositionStart = () => {
  searchInputElement?.removeEventListener("keydown", handleKeyDownInput);
  searchInputElement?.addEventListener("keydown", handleKeyDownInputWithoutEnter);
  searchInputElement?.addEventListener("compositionend", handleCompositionEnd, {once: true});
};
const handleCompositionEnd = () => {
  searchInputElement?.removeEventListener("keydown", handleKeyDownInputWithoutEnter);
  searchInputElement?.addEventListener("keydown", handleKeyDownInput);
  searchInputElement?.addEventListener("compositionstart", handleCompositionStart, {once: true});
};

const handleFocusSearchInput = () => {
  searchInputElement?.addEventListener("compositionstart", handleCompositionStart, {once: true});
  searchInputElement?.addEventListener("keydown", handleKeyDownInput);
  searchInputElement?.addEventListener('input', handleInputSearchWord);
  searchInputElement?.addEventListener("blur", handleBlurSearchInput, {once: true});
};
const handleBlurSearchInput = () => {
  searchInputElement?.removeEventListener("compositionstart", handleCompositionStart);
  searchInputElement?.removeEventListener("compositionend", handleCompositionEnd);
  searchInputElement?.removeEventListener("keydown", handleKeyDownInput);
  searchInputElement?.removeEventListener("keydown", handleKeyDownInputWithoutEnter);
  searchInputElement?.removeEventListener('input', handleInputSearchWord);
  searchInputElement?.addEventListener("focus", handleFocusSearchInput, {once: true});
  bodyElement?.addEventListener("keydown", handleKeyDownDoby);
};

const getIsMobileOrTablet = () => {
  try {
    return navigator.userAgent.match(/iPhone|iPad|Android.+Mobile/) ?? false;
  } catch (error) {
    return false;
  }
}

searchInputElement?.addEventListener("focus", handleFocusSearchInput, {once: true});
!getIsMobileOrTablet() && searchInputElement?.focus();

const params = new URLSearchParams(document.location.search);
const currentInput = params.get("q");

if(currentInput && searchInputElement){
  searchInputElement.value = currentInput;
  handleActiveClearButton.active();
};

bodyElement?.addEventListener("keydown", handleKeyDownDoby);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((registration) => {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, (err) => {
      console.log('ServiceWorker registration failed: ', err);
    });
  }, {once: true});
};
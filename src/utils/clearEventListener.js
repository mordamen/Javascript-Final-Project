//clears an event listener based on idKeyword + '-' and a handle function to clear it from
const clearEventListeners = (idKeyword, handleFunc) => {
    let BtnsBefore = document.querySelectorAll(`[id^='${idKeyword}-']`);
    for (let Btn of BtnsBefore) {
        Btn.removeEventListener("click", handleFunc);
    }
}

export {clearEventListeners};
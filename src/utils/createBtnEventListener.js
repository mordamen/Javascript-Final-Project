//creates an event listener for a button based on the idKeyword, and a function that the event triggers
const createBtnEventListener = (idKeyword, handleFunc) => {
    let Btns = document.querySelectorAll(`[id^=${idKeyword}-]`);
    for (let Btn of Btns){
        Btn.addEventListener("click", handleFunc);
    }
}

export {createBtnEventListener}
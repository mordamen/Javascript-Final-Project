let toastWrapper; 
let id = 1;

window.addEventListener("load", () => {
    toastWrapper = document.getElementById("toast-wrapper");
})

//Used to generate toast in case of errors, currently in login, profile, and register.
//Or success message like favorite added.
//Returns the toast html element and the id of said toast html element
const generateToast = (title, msg, success) => {
    const successIcon = `<img src="assets/images/successIcon.png" class="rounded me-2 toast-icon" alt="success Icon">`;
    const errIcon = `<img src="assets/images/errorIcon.png" class="rounded me-2 toast-icon" alt="error Icon">`;
    let thisId = id++;
    return [
        `<div class="toast" role="alert" aria-live="assertive" aria-atomic="true" id="toast-${thisId}">
            <div class="toast-header">
                ${success ? successIcon : errIcon}
                <strong class="me-auto">${title}</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close">
                </button>
            </div>
            <div class="toast-body">
                ${msg}
            </div>
        </div>`,
        `toast-${thisId}`];
}
const showToast = (title, msg, success) =>{
    let newToastWithId = generateToast(title, msg, success);
    toastWrapper.innerHTML += newToastWithId[0];
    const toast = new bootstrap.Toast(document.getElementById(newToastWithId[1]));
    toast.show()
    setTimeout(() => {
        document.getElementById(newToastWithId[1]).remove();
    }, 3000);
    
}

export {showToast};


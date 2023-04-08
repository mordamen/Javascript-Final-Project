//Receives an input element, alert element, a validation func, and a prefix for error message
//returns false if theres errors, true if theres none.
const checkIfInputIsValid = (elemInput, elemAlert, validateFunc, prefixLabel) => {
    let errorArr = validateFunc(elemInput.value, prefixLabel);
    let res;
    if (errorArr.length === 0) {
    //no error
        elemInput.classList.remove("is-invalid");
        document.getElementById(elemAlert).classList.add("d-none");
        res = true;
    } else {
        // error/s
        elemInput.classList.add("is-invalid");
        document.getElementById(elemAlert).classList.remove("d-none");
        document.getElementById(elemAlert).innerHTML = errorArr.join("<br>"); 
        res = false;
    }
    return res;
}

export default checkIfInputIsValid;
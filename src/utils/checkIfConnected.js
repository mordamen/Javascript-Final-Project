//checks if the user is connected by examining if the token is not null
const checkIfConnected = () => {
    let token = localStorage.getItem("token");
    if(!token){
        return false;
    }
    token = JSON.parse(token);
    return !!token//token !== null;
};

export default checkIfConnected;
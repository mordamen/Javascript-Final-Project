const getIdFromClick = (ev) =>{
    let idFromId = ev.target.id.split("-");
    if(!ev.target.id){
        idFromId = ev.target.parentElement.id.split("-");
    }
    return(idFromId[1]);
}

export default getIdFromClick;
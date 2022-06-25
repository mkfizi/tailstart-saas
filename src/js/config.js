const initializeObjectById = (id, object) => {
    let element = document.getElementById(id);
    if (element != null) new object(element);
}

const initializeObjectByQuery = (query, object) => {
    let element = document.querySelectorAll(query);
    for (let i = 0; i < element.length; i++) {
        new object(element[i]);
    }
}

export {
    initializeObjectById,
    initializeObjectByQuery
}
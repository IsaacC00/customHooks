//? lo que tenmos aqui es nuestro reducer 
export const todoReducer = (initialState = [], action) => {

    //? basicamente evaluamos con un switch el type de la action
    switch (action.type) {
        case '[ToDo]Add ToDo':
            //? mucho ojo no mutamos el arreglo 
            //? por ello utilizamos ..., siguiente de 
            //? esto agregamos el payload de nuestro action
            return [...initialState, action.payload];
        //? regreesamo el initalstatee  en caso de que no 
        //? pase nada con el useReducer porque se esperaria 
        //? el estado inicial que se tenia antes de realizar una accion

        //?case para eliminar un Todo
        case '[ToDo]Delete ToDo':
            //? recordar no mutar el initialState solo devolver un nuevo arreglo
            //? en el payload lo unico que vamos a devolver es el id
            return initialState.filter(todo => todo.id !== action.payload);
        case '[ToDo] toggle ToDo':
            //? lo que vamos a regresar es un nuevo arreglo 
            //? comoparamos el id del todo enviado en el payload y regresamos
            //? todos los todos pero con la propiedad
            //? dane actualizada es decir que: !done
            return initialState.map(
                todo => {
                    if (todo.id === action.payload) {
                        return {
                            ...todo,
                            //? la propiedad de done actualizamos 
                            //? con la negacion de esta, 
                            done: !todo.done
                        }
                    }
                    return todo;
                });

        default:
            return initialState;
    }
}
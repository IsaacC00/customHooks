import { useEffect, useReducer } from "react"
import { todoReducer } from "../09-useReducer/todoReducer";

export const useToDo = () => {

    const initialState = [
        // {
        //     id: new Date().getTime(),
        //     description: 'Realizar carreras de circuito: B,A,A+',
        //     done: false
        // },
        // {
        //     id: new Date().getTime() * 3,
        //     description: 'Acabar primero en las quedada: B,A,A+',
        //     done: false
        // },
        // {
        //     id: new Date().getTime() * 2,
        //     description: 'Tunear el corvette c8 para cornering',
        //     done: false
        // },
        // {
        //     id: new Date().getTime() * 4,
        //     description: 'Tratar de adquirri nissan Z prototype',
        //     done: false
        // }
    ];

    //? use reducer tiene otro tercer parametro, pero este es para cuando se ejecutan funciones pesadas 
    //? o en este caso lo utilizamos para guardar nuestros datos en el localStorage 
    //? para ello debemos de crear esta tercera funcion que parsee los ToDos del 
    //? local storage en caso de no haber nada regresa un arreglo vacio 
    const init = () => {
        return JSON.parse(localStorage.getItem('todos')) || [];
    };
    
     //? deestructuramos el arreglo con el state y el dispatch(despachar las acciones)
    //? importamos y pasamos como parametro el todoReducer y solo pasamos la referencia
    //* Referencias todoReducer vs Ejecucion todoReducer()
    //* por que el useReducer se encarga de ejecutarlo

    const [todos, dispatchTodo] = useReducer(todoReducer, initialState, init);
    //? podemos renombrar las variables en caso de tener mas de un useReducer
    //? por default tiene state, dispatch

    //* agregar las nuevas marcas las nuevas tareas
    const handleNewToDo = (todo) => {
        //? creamos nuestro action como obejto y
        //? declaramos el type y el dispatch 
        const action = {
            type: '[ToDo]Add ToDo',
            payload: todo
        };
        //? Mandamos nuestro nuevo ToDo 
        //? con el metodo dispatch
        dispatchTodo(action);

    }

    //? vamos a almacenar nuestros todos en el navegador 
    //? para ello vamos a utilizalr el localStorage
    //? la logica es la siguiente
    //? necesito ejecutar un efecto caad vez que 
    //? se agregar un nuevo ToDo

    useEffect(() => {
        //? como parametros va el 
        //? el key y el valor en string 
        //? ya que los navegadores solo almacenan strings  
        //? no objetos
        localStorage.setItem('todos', JSON.stringify(todos));

    }, [todos]);

    //? funcion para elminar los ToDo's para ello 
    //? hacemos debemos de pasar la funcion 
    //? por cada componente creado 

    const handleDeleteToDo = (id) => {
        console.log(id);
        dispatchTodo({
            type: '[ToDo]Delete ToDo',
            payload: id
        })

    };

    //? funcion para actualizar el estado del ToDo
    const handleToggleToDo = (id) => {
        console.log(id);
        dispatchTodo({
            type: '[ToDo] toggle ToDo',
            payload: id
        })

    };

    return ({
        todos,
        //?podemos devolver los valores de las propiedad aqui mismo
        todosCount:todos.length,
        pendingTodosCount:todos.filter(todo => !todo.done).length,
        handleDeleteToDo,
        handleNewToDo,
        handleToggleToDo,

    });
}
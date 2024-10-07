import { useState } from "react"

//este custom hook nos permite tener la logica de negocio fuera de nuestros 
//componentes y mantener nuestro codigo limpio y ordenado 
export const useCounter = (initialValue = 10) => {
    
    const [counter, setCounter] = useState(initialValue);
    
    //incrementar en 2, mucho OJO 
    //debemos de hacer un callback desde nuestro componente para 
    //evitar errores al momento de invacar la funcion 
    const increment = (value = 1) => {
        setCounter(counter + value);
    };
    
    const decrement = (value = 1) => {
        if (counter  === 0) return;
        setCounter(counter - value);
    };

    const reset = () => {
        setCounter(initialValue);
    };

    return{
        counter,
        increment,
        decrement,
        reset 
    }
}
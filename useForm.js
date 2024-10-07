//estado para manejar el form
//este es  un hooks para manejar cualquier tipo de formulario 
import { useState } from "react";

//pasamo un objeto como valor inicial
export const useForm = (initialValue={}) => {

    const [formState, setFormState] = useState(initialValue);

    //? funcion que nos permite 
    //? obtener el target del input
    //? obtenemos del target el name y el valor del target
    //? y actualizamos el estado con el nuevo objeto
    //? y los demas objetos 
    
    const onInputChange = ({target}) => {
        const {name,value} = target;
        setFormState({
            ...formState,
            [name]:value,
        });
    }

    const onResetForm = () => {
        setFormState(
            initialValue
        );
    }
    
    return ({
        //? deestructuramos el estado (obejto) del form 
        //? para acceder a las propiedades en cualquier lugar 
        ...formState,
        formState,
        onInputChange,
        onResetForm
    })

}

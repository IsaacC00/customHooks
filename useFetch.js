//manejar el cahce 
//para ello declaramos un objeto que guardara toda la infor de 
//los pokemones que ya hayan cargado en nuestra aplicaion 
const localCache = {};

//debemos tomar en cuenta que 
//cada que se renderizaa el componente y tenemos una
//peticion esta se vuelve a ejecutar y no queremos eso \
//por ello utilizamos este custom Hook 
//para que la peticion solo se dispare una vez

import { useEffect, useState } from "react"

//no siempre voy a quere hacer la peticion al mismo url o
//o avexes cambie de parametros la url 
//entonces mandamos la url como parametro 
export const useFetch = (url) => {

    //creamos nuestro useState para deestrutura desde afuera 
    //nuestro customHoo, que ademas, al tener la 
    //funcion setState que nos ayudara a que 
    // cada vez que hay un cambio en la data 
    //esta redibujar el comoponente y alertara a 
    //que hay nueva data o hay data que evaluar 
    const [state, setState] = useState({
        data: null,
        isLoading: true,
        hasError: false,
        error: null
    });

    //creamos nuestro useeffect para hacer la peticion cada que 
    //la url cambie
    useEffect(() => {
        getFetch();
    }, [url]);

    // funcion para resetear nuestro estado cada vex que la url cambie
    const setLoadingState = () => {
        setState({
            data: null,
            isLoading: true,
            hasError: false,
            error: null
        });
    }

    //funcion asincrona para hacer la peticion 
    const getFetch = async () => {

        //si tenemos cahce entonce ya no cargamos nada 
        if (localCache[url]) {
            console.log('usando cache');
            //actualizamos el estado con:
            ///la data que sea igual a lo que ya tenemos en memoria
            //loading = false por que ya cargo \
            //erro falso y null por que en teoria ah cargado
            setState({
                data: localCache[url],
                isLoading: false,
                hasError: false,
                error: null
            });
            return;
        }

        setLoadingState();
        //sleep para esperar 1.5 swegundos
        await new Promise(resolve => setTimeout(resolve, 1500));

        const resp = await fetch(url);

        //en caso de que la peticion falle 
        if (!resp.ok) {
            setState({
                data: null,
                isLoading: false,
                hasError: true,
                error: {
                    code: resp.status,
                    message: resp.statusText,
                }
            });
            //return para que ya no ejecute nada mas
            return;
        }
        //en caso de que la peticion no falle
        const data = await resp.json();
        setState({
            data: data,
            isLoading: false,
            hasError: false,
            error: null
        });

        //almacenamos la data 
        localCache[url] = data;

    }

    return {
        data: state.data,
        isLoading: state.isLoading,
        hasError: state.hasError,
    }
}

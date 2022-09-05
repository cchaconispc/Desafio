
   function mover_letras(cadena){
        let aux="";
        let  y = 1;
        let z;
        let cadena_aux = cadena;
        let largo = cadena_aux.length;

        for (x = 1; x < cadena.length / 2; x = y + z){                  //Reordeno los caracteres de la cadena.
            z = y;
            y = x;                                                      // Usamos la serie de Fibonachi para ver cuales cambiamos
            aux = cadena_aux [x];                                       // de lugar, para desordernar la cadena original (podria ser los impares,
            cadena_aux [x] = cadena_aux [largo - x];                    // o cualquier otro patron infinito; o finito repetitivo)
            cadena_aux [largo - x] = aux;
        }
        return cadena_aux;
    }

    function* letras_frase_cortada(recortada){                          //Generator para leer de a una las letras de una cadena
        let i = 0;
        while(i < recortada.length){
        yield recortada[i];
        i++;
        }
    }


    function desordenar (cadena) {
        
        let cadena_aux = cadena.split("").reverse();         // primero invertimos la cadena original (haciendola lista)
        cadena_aux = mover_letras(cadena_aux);

        let recortada ="";
        cadena_aux.forEach((letra, indice) => {                         // Usamos un RANDOM de posibilidad 1 / 3 para
            if (Math.floor(Math.random()*2) == 1) {                     // decidir cuales letras se recortan
                recortada += letra;
            }
        })
        return [cadena_aux.join(""), recortada];                // Retornamos la cadena original, y la cadena desordenada y recortada
    }                                                           // Ambas como Str (el desafio pide Str)
    


    function crear_dicc (){
        let cadena_original= "Que poronga para realizar que es esto";          // Acá coloco la frase que quiera pasar para trabajar

        let retorno = desordenar(cadena_original);                                      // Usar una promesa aca
        
        let desordenada= retorno[0].split("");                                 // Como retorna una cadena (pedido del desafio), la paso  
        let recortada = retorno[1].split("");                                  // a lista para trabajar.
        
        let dicc={};
        let auxiliar = letras_frase_cortada(recortada);                        // Genero un iterador (generator) para tomar las letras que quedaron
                                                                               
        let letra_aux = auxiliar.next()
        desordenada.forEach((letra,indice) => {
            if (letra != letra_aux) {                                   // voy viendo en la cadena para ver cual no esta en posición
                (dicc.hasOwnProperty(letra)) ? dicc[letra].push(indice) : dicc[letra] = [indice];  //creo clave en el diccionario o agrego a la lista de la clave si ya esta
            }
            else {letra_aux = auxiliar.next()}
        });
        return [recortada, dicc]
    }


    function ordenar () {
        let retorno = crear_dicc ();
        let recortada = retorno[0];
        let dicc = retorno[1];

        let cadena = [];
        Object.keys(dicc).forEach((letra) => {                              //Coloco cada letra del diccionario en su lugar correcto
                dicc[letra].forEach((lugar) => {                            // segun la lista de cada clave.
                    cadena[lugar] = letra;
                })
        })

   
        let agregar = letras_frase_cortada (recortada);

        cadena.forEach ((letra, indice) =>{                                 // En la cadena busco los NaN (que no estaban en el diccionario)
            if (letra === NaN) {                                            // los completo con los que estaban en la cadena recortada
                cadena[indice] = agregar.next();
            }

        })

        cadena_aux = mover_letras (cadena);                                  // Reordeno la cadena
        cadena = cadena_aux.reverse().join("");                             // Los invierto para tener la frase original.
        return cadena;
    }
    

console.log(ordenar());







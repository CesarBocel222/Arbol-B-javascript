const fs = require('fs');
const BTree = require('../Btree/Btree.js');
const KeyValuePair = require('../Btree/KeyValuePair.js');
const { parse } = require('path');
fs.readFile("C:/Users/50255/Desktop/URL/Sexto ciclo/Estructura 2/datos.txt", 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo:', err);
      return;
    }

    const lines = data.split('\n');
    const bTree = new BTree(4); 
    for (const line of lines) {
      const [action, data] = line.split(';');
      if (action && data) {
        if(action == "INSERT"){
            var value = JSON.parse(data);                        
            let kvp = new KeyValuePair(value["name"], value);
            console.log("Datos ingresado 😎");
            console.log(value["name"], value);
            bTree.insert(kvp);
          }else if(action == "PATCH"){
            var value = JSON.parse(data);
           bTree.patch(value["name"], value);
           console.log("Datos actualizado 😎");
           console.log(value["name"], value)
          }else if(action == "DELETE"){
            var value = JSON.parse(data);
            let kvp = new KeyValuePair(value["name"], value);
            bTree.delete(kvp);
            console.log("Datos eliminado 😎");
            console.log(value["name"], value)
          }
        }
    }
    
    rl.question('Ingrese 1 para buscar, 2 para mostrar los datos disponibles o 3 para salir', (opcion) => { 
      
      switch (opcion) {
        case "1":
          var buscar = console.log("Ingrese el dato que desea buscar");
          buscar = parseInt(buscar);
          bTree.search(buscar);
          break;
          
          case "2":
            bTree.view();
            break;
            
            case "3":
              alert("Saliendo del menú.");
              break;
              
              default:
                alert("Opción no válida. Por favor, selecciona una opción válida.");
                break;
              }
  });
});
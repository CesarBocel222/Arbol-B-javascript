const fs = require('fs');
const BTree = require('../Btree/Btree.js');
const prompt = require('prompt-sync')();
const KeyValuePair = require('../Btree/KeyValuePair.js');
console.log("Bienvenido!");
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
           console.log("Datos actualizado 👌");
           console.log(value["name"], value)
          }else if(action == "DELETE"){
            var value = JSON.parse(data);
            bTree.delete(value["name"]);
            console.log("Datos eliminado ☠️");
            console.log(value["name"], value)
          }
        }
    }
    console.log("1. Ingrese el nombre que desea buscar");
    console.log("2. Mostrar datos");
    console.log("3. Exit");
    var salida;
  do {

    const choice = prompt('Ingrese una opción: ');
    switch (choice) {
      case "1":
        var nombre = prompt('Ingrese el nombre que desea buscar: ');
        bTree.search(nombre);          
        break;
        case "2":
          bTree.view();
          break;
          case "3":
            console.log("¡Hasta luego!");
            break;
            default:
              console.log("Opción inválida");
              break;
          }
      salida = choice;
    }while(salida != "3");
});


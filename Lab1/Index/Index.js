const fs = require('fs');
const BTree = require('../Btree/Btree.js');
const { json } = require('stream/consumers');
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
            console.log(value["dpi"]);            
            let kvp = new KeyValuePair(value["dpi"], value);
            bTree.insert(kvp);
          }
          

      }
  }    
    //console.log(valores);
    
    // const jsonData = JSON.parse(data);
    
    // // Crear un árbol B
    // const bTree = new BTree(4); 
    
    // // Insertar datos del JSON en el árbol
    // jsonData.forEach((item) =>  {
    //   const key = item.key;
    //   const value = item.value;
    //   const kvp = new KeyValuePair(key, value);
    //   bTree.insert(kvp);
    // });
});
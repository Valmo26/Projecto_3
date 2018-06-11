
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 /home/allan/viajes.json*/
var json = '{"result":true, "count":42}';
obj = JSON.parse(json);

console.log(obj.count);
// expected output: 42

console.log(obj.result);
// expected output: true

function loadJSON(file, callback) {   
    var obj = new HttpRequest();
    obj.overrideMimeType("application/json");
    obj.open('GET', file, true); // Replace 'my_data' with the path to your file
    obj.onreadystatechange = function () {
          if (obj.readyState == 4 && obj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(obj.responseText);
          }
    };
    obj.send(null);  
 }
 

function load() {
    
    loadJSON("data.json", function(response) {
  
        var actual_JSON = JSON.parse(response);
        console.log(actual_JSON);
    });
    
    
}
console.log(load());
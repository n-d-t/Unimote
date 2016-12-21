function init(){
  db = openDatabase('Hello', '1.0', 'DB', 2 * 1024 * 1024);
}
function insert(data){
  alert("hi");
  var button = {};
  button["element"]=data.element;
  var conn = {};
  conn["connection"]=data.connection;
  var client = data.device;
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS device (device_id primary key, device_name, button_config TEXT, conn_config, client_config)');
    tx.executeSql('INSERT INTO device VALUES (102, "Wifi_Bot",?,?,?)',[JSON.stringify(button),JSON.stringify(conn),JSON.stringify(client)]);
  });
}
function view(){
  db.transaction(function(tx){
    tx.executeSql('SELECT * FROM device', [], querySuccess, errorCB);
  });
}
function querySuccess(tx, results) {
    var len = results.rows.length;

    for (var i = 0; i < len; i++) { // loop as many times as there are row results
        document.getElementById("output").innerHTML +=
        "<table><tr><td>ID = " + results.rows.item(i).device_id +
        "</td><td>data = " + results.rows.item(i).button_config +
        "</td></tr></table>";
    }
}

function errorCB() {
    alert("DB access FAILED");
};
function successCB() {
    alert("DB access SUCCEEDED");
};

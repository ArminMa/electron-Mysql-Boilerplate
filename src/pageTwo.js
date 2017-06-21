'use strict'
import { remote } from 'electron';
// import { mysql } from 'mysql';
const background = remote.require('./background.js');

var button = document.createElement('button');
button.textContent = 'Open window';
button.addEventListener('click', () =>{
  var window = remote.getCurrentWindow();
  background.openWindow('app');
  window.close();
}, false);


document.getElementById('btnSQLConnect').addEventListener('click', () =>{
  mySqlConnector();
}, false);


document.getElementById('btnSQLCREATETABLE').addEventListener('click', () =>{
  let mysql = require("mysql");
  const connection = mySqlConnector();

  var queryString = "CREATE TABLE `electrondb`." +
    "`creattable` (`id` INT NOT NULL AUTO_INCREMENT," +
    "`company_name` VARCHAR(245) NULL DEFAULT 'null',PRIMARY KEY (`id`),UNIQUE INDEX `id_UNIQUE` " +
    "(`id` ASC),UNIQUE INDEX `companyName_UNIQUE` (`company_name` ASC));";
  connection.query(queryString, (err, rows, field) =>{
    if(err){
      document.querySelector('#dataURLInto').textContent = err.stack;
      return console.log(err.stack);
    }
    document.querySelector('#dataURLInto').textContent = 'rows: '+rows + ' ,\n field:' + field;

  })
}, false);

let intClobleCounter = 0;
document.getElementById('btnSQLInsertData').addEventListener('click', () =>{
  intClobleCounter++;
  const connection = mySqlConnector();
  var queryString = "insert into creattable (company_name) value ('lundaTester"+ (intClobleCounter) +"');";
  connection.query(queryString, (err, rows, field) =>{
    if(err){
      document.querySelector('#dataURLInto').textContent = 'intClobleCounter: ' + intClobleCounter + '\n'+ err.stack;
      return console.log(err.stack);
    }
    document.querySelector('#dataURLInto').textContent = 'rows: '+rows + ' ,\n field:' + field;

  })
}, false);

document.getElementById('btnSQLSelectAllRows').addEventListener('click', () =>{

  const connection = mySqlConnector();
  var queryString = "SELECT * FROM electrondb.creattable;";
  connection.query(queryString, (err, rows, field) =>{
    if(err){
      document.querySelector('#dataURLInto').textContent = err.stack;
      return console.log(err.stack);
    }
    document.querySelector('#dataURLInto').textContent = 'rows: '+DbObjectToString(rows) + ' ,\nfield:' + DbObjectToString(rows);

  })
}, false);


document.body.appendChild(button);

document.querySelector('#dataURLInto').textContent = 'sql info Runs through h here';
document.querySelector('#pageTwoText').innerHTML = 'Hello page two test Script';
document.querySelector('#pageTwoHeader').innerHTML = 'Hello page Header';


function mySqlConnector() {
  let mysql = require("mysql");
  const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"electronDB"
  });

  connection.connect((err) => {
    if(err){
      document.querySelector('#dataURLInto').textContent = err.stack;
      return console.log(err.stack);
    }
    document.querySelector('#dataURLInto').textContent = 'sql connected';
  });
  return connection;
};

/**
 * @return {string}
 */
function DbObjectToString(arraysObject){
  let stringVal = '';
  var dbObject;
  for(var i=0; i< arraysObject.length; i++){
    dbObject = arraysObject[i];
    stringVal += '(' + dbObject.id + ', ' + dbObject.company_name + ')';
    if(i< arraysObject.length){
      stringVal += ' , '
    }
  }
  return stringVal;
}




var request = require('request');
var cheerio = require('cheerio');
var hashMap = require('hashmap');
var mysql = require('mysql');



//database connection created
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
 // database: "mydb"
});


//database and table created
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE if not exists mydb", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    var sql = "CREATE TABLE if not exists mydb.Crawler (url_name VARCHAR(255), references_number VARCHAR(255),parameters TEXT(60000))";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
  });
});



//url to be crawled
var url = 'http://medium.com'



var a = new Array();
var m = new Map();
var m1 = new Map();
var result = new Array();


//crawler function
request(url, function(err, resp, body){
  $ = cheerio.load(body);
  links = $('a'); //jquery get all hyperlinks
  $(links).each(function(i, link){

    

a.push($(link).attr('href'));
    });


countIncrease(a,m);
forparameter(a,m,m1);

resultSet(m,m1,result);
insertion(con,m,m1,result);

});

function countIncrease(a,m)
  {
for(var j=0;j<a.length;j++)
{
    var arr = a[j].split("?"); 
    m.set(arr[0],0);
}

for(var i=0;i<a.length;i++)
{
    //console.log(a[i]);

    var array = a[i].split("?");

    
    m.set(array[0],m.get(array[0])+1);
   
  // console.log(array[0]+"-----"+array[1]);
 //  console.log(m.get(array[0]));
  //if(m.get(a[i]))

}
 }

function forparameter(a,m,m1)
{
    for(var j=0;j<a.length;j++)
    {
        var array = a[j].split("?");
        var arr = new Array();
        m1.set(array[0],arr);

    //    console.log(m1.get(array[0]));
    }

    for(var j=0;j<a.length;j++)
    {
        var array = a[j].split("?");
        m1.get(array[0]).push(array[1]);
      //  console(m1.get(array[0]))
    
 //   console.log(m1.get(array[0]));
    }
    
}

function resultSet(m,m1,result)
{
    

    for (var entry of m.entries()) {
        var key = entry[0],
            value = entry[1];
            console.log(key+" "+value);
        result.push([key,value]);
    }

  // result.push([2,2]);
    
}

function insertion(con,m,m1,result)
{
    // con.connect(function(err) {
    //     if (err) throw err;
        console.log("Connected!");
        var sql = "INSERT INTO mydb.crawler (url_name,references_number ) VALUES ?";

        var values = result;
        con.query(sql, [values], function (err) {
            if (err) throw err;
            console.log("Number of records inserted: ");
        
        });

     //   console.log(result);
      }







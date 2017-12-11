var express=require('express')
var app=express()
var request=require('request')
var cookieParser = require('cookie-parser')
var fs=require('fs');
var bodyParser = require("body-parser");
var json;
var json1;

//a) fetches a list of authors from a request to https://jsonplaceholder.typicode.com/users

app.get('/authors',function(req,res){
  request('https://jsonplaceholder.typicode.com/users', function (error, response, body) {
  json=JSON.parse(body);
  
  //extract all users from json to an array
  var arr = [];
  for (var id in json) {
    arr.push(json[id]["name"]);
}
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log(arr);
  res.send(arr);
 });
})

//b) fetches a list of posts from a request to https://jsonplaceholder.typicode.com/posts

app.get('/posts',function(req,res){
  request('https://jsonplaceholder.typicode.com/posts', function (error, response, body) {
  json1=JSON.parse(body);
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log(json1);
  res.send(json1);
 });
})

//c) Respond with only a list of authors and the count of their posts (a newline for each author).
app.get('/count',function(req,res){
  request('https://jsonplaceholder.typicode.com/users', function (error, response, body) {
  json=JSON.parse(body);
  });
  request('https://jsonplaceholder.typicode.com/posts', function (error, response, body) {
  json1=JSON.parse(body);
  });
  
var count_posts={}  
for (var id in json){
	var user=json[id]["name"];
	count_posts[user]=0;
	for (var id1 in json1){
		if (json1[id1]["userId"]==json[id]["id"]){
			count_posts[user]+=1;
		}
	}
}
res.send(count_posts);
});

//Set a simple cookie ( if it has not already been set ) at http://localhost:8080/setcookie with the following values:name=<your-first-name> and age=<your-age>
//app.use(express.cookieParser());
app.get('/setcookie',function(req,res){
res.cookie('Lintu','29',{maxAge:3000000}).send('cookie set');	
});

//Fetch the set cookie with http://localhost:8080/getcookies and display the stored key-values in it.
app.use(cookieParser());
app.get('/getcookies',function(req,res){
  request('http://localhost:8080/setcookie', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(response.headers);
			res.send(response.headers['set-cookie']);
        }
    })
});

//Deny requests to your http://localhost:8080/robots.txt page. (or you can use the response at http://httpbin.org/deny if needed)
app.get('/robots.txt',function(req,res){
	res.send('You\'re are not in the right place');
});

//Render an HTML page at http://localhost:8080/html or an image at http://localhost:8080/image.
app.get('/html',function(req,res){
res.writeHead(200,{'Content-Type':'text/html'});
fs.readFile('./test_html.html',null,function(error,data){
	if(error){
		res.writeHead(404);
		res.write('File not found');
	}else{
		res.write(data);
	}
	res.end();
});
});

app.get('/image',function(req,res){
	var img = fs.readFileSync('./test_image.gif');
     res.writeHead(200, {'Content-Type': 'image/gif' });
     res.end(img);
});

//A text box at http://localhost:8080/input which sends the data as POST to any endpoint of your choice. 
//This endpoint should log the received to stdout.
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/input', function (req, res) {
    res.sendFile(__dirname + '/textbox.html');
});
app.post('/submit-name', function (req, res) {
    var name = req.body.firstName;
     res.send(name + ' Submitted Successfully!');
	console.log(name + ' Submitted Successfully!');
});

app.listen(8080,function(){
	console.log('Example app listening to port 8080!')
})

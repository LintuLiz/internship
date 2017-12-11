var http=require("http");
http.createServer(function(request,response){
	response.writeHead(200,{'Content-type':'text/plain'});
	response.end("Hello World - Lintu\n");
}).listen(8080);
console.log('Server running at http://localhost:8080/');

/*The code imports the "http" module and uses it to create a server (createServer()) that listens for HTTP requests on port 8000. 
The script then prints a message to the console about what browser URL you can use to test the server. 
The createServer() function takes as an argument a callback function that will be invoked when an HTTP request is received — this simply 
returns a response with an HTTP status code of 200 ("OK") and the plain text "Hello World".


>node hellonode.js
Server running at http://localhost:8080/

Navigate to the URL (http://localhost:8080/). If everything is working, the browser should simply display the string "Hello World".*/
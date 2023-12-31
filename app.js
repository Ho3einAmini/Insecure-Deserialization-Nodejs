var express = require('express');
var cookieParser = require('cookie-parser');
var escape = require('escape-html');
var serialize = require('node-serialize');
var app = express();
app.use(cookieParser())

app.get('/', function(req, res){
	if(req.cookies.profile){
		var str = new Buffer(req.cookies.profile, 'base64').toString();
		var obj = serialize.unserialize(str);
		if(obj.username){
			res.send("Hello " + escape(obj.username));
		}
	}
	else{
		res.cookie('profile', "eyJ1c2VybmFtZSI6Ikhvc3NlaW4iLCAiZW1haWwiOiJoX2FtaW5pQGlzYy5jby5pciJ9", {
			maxAge: 900000,
			httpOnly: true
		});
	}
	res.send("Hello World!");
});
app.listen(3000);

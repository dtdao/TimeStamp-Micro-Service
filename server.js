var express = require("express")
var app = express()
var path = require("path")
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

app.use(express.static('public'));

app.get("/:timestamp", function(req, res){
  res.json(dateConvert(req.params.timestamp))
})


app.get("/", function(req, res){
  res.sendFile(path.join(__dirname + "/views/index.html"))
})

function dateConvert(string){  
  //Number(string).toString().length  convers to a number to get rid of the zero, if the first number is a zero.
  if(isNaN((String))){ ///unix unit so conver to standard format
    var date = new Date(Number(string*1000))
    if(isNaN(date.getMonth())){
      return {"unix": null, "natural": null }
    }
    return {"unix": Number(string), "natural": months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear() }
  }
  else {    
    return naturalConvert(string)
  }
  
  return {"unix": null, "natural": null }
}

function naturalConvert(string){
  var date =  new Date(decodeURI(string))
  if(date > 0) {
    return {"unix": date.getTime()/1000, "natural": months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear() }
  }else {
     return {"unix": null, "natural": null }
  }
}

app.on("error", function(err){return console.error(err)})

// listen for requests :)
app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + this.address().port);
});

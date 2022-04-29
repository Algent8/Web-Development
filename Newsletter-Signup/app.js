const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));

// app.use(express.json());    // Cam use instead of BodyParser but don't fully understand
// app.use(express.urlencoded());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  // console.log(firstName + lastName + email);

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://<dc>.api.mailchimp.com/3.0/lists/listId"
  // replace <dc> with us(# your api gives), replace listId with your List Id

  const options = {
    method: "POST",
    auth: "user:ApiKey" // put APIKey from MailChimpo=
  }

  const request = https.request(url, options, function(response){

    if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    } else{
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data){
      console.log(JSON.parse(data));
  })
  request.write(jsonData);
  request.end();

})

app.post("/failure", function(req, res){
  res.redirect("/");
})


app.listen(3000 || process.env.PORT, function() { // replace 3000 with process.end.PORT when using Heroku to publish application
  console.log("Server is running on port 3000.");
})

//API Key
// Finish MailChimp Account

//List Id
// Finish MailChimp Account

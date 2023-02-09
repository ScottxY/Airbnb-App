const express = require('express');
const app = express();
const queries = require("./mysql/queries");
const mysql = require('mysql');
const config = require('./mysql/config');
const { getCon } = require('./mysql/config');

app.set('view engine', 'ejs');
app.listen(3000);

app.get('/', function(request, response) {

let con = getCon();
con.connect();


        response.render("index");
        //response.send(result);



    con.end();

});


app.get('/airbnb', (request, response) => {
  response.render('airbnb', { title:'AirBnb' });
});

app.get('/airbnb/find-one', (request, response) => {
  const amenities = request.query.amenities 
  if (amenities === undefined)
  {
  response.render("null");
  }

  else{
  //let rooms = document.getElemnetId("bedrooms");
  let findL = queries.findListing(
    { 
      number_rooms: request.query.bedrooms,
      amenities,
      guests : request.query.guests,
      price : request.query.nights
    })

//this function is only to display amenities for one listing
    let amenitiesQ = queries.getAmenities(
      {

        
        number_rooms: request.query.bedrooms,
        amenities,
      guests : request.query.guests,
      price : request.query.nights

      }
    )
    Promise.all([findL, amenitiesQ]).then(result => {
      if (result[0][0] == 0 || result[1] == 0)
      response.render("null");
      else
      response.render("listing", { hello: result[0][0], listings: result[1]});
      
    });

  }
});

//this is goes to the 2nd page of many listings
app.get ("/airbnb/find-many", async (request, response) => {
  queries.findListings(
    { 
      number_rooms: request.query.bedrooms,
      stateId: request.query.states,
      cityId: request.query.cities,
    }).then(result => {

      if (result == 0)
      response.render("null");
      else
      response.render("listings", { listings: result });
    });
});


//this route is for 2 functions
app.get ("/airbnb/find", (request, response) => { 
  let fFindings = queries.findings(
    { 
      cityId: request.query.cityId
    })

    // this function just displays amenities only and this done using a for loop
    let amenityQuery = queries.extended(
      { 
        placeId: request.query.placeId
      })

      Promise.all([fFindings, amenityQuery]).then(result => {
        //this will redirect to null ejs 
        if (result == 0)
      response.render("null");
      else
        response.render("listing2", {hello :result[0][0], listings :result[1] });
    });
});









//these routes are for dropdeown foe cities and states

// http://localhost:3000/states
app.get("/states", (request, response) => {
  // requires an object to be passed
  let con = getCon();
  con.connect();

  con.query("SELECT * FROM states ORDER BY name", (error, result) => {
      response.json(result);
  });

  con.end();
});

// http://localhost:3000/cities?state=1234
app.get("/cities", (request, response) => {
  let con = getCon();


  con.connect();
//`
//SELECT * FROM CITIES WHERE state_id = '${request.query.state}' ORDER BY NAME
//`;

  //SELECT * FROM CITIES WHERE state_id = '12344' ORDER BY NAME
  con.query("SELECT * FROM cities WHERE state_id = '" 
  + request.query.state + "' ORDER BY name", (error, result) => {
      response.json(result);
  });

  con.end();
});


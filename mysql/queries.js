const mysql = require("./config.js");


function findListing(criteria) {
    let query = `SELECT A.*, B.name as cityName, C.name as stateName, D.first_name, D.last_name, D.email
        FROM places A
        JOIN cities B on A.city_id = B.id
        JOIN states C on C.id = B.state_id
        JOIN users D ON A.user_id = D.id
        WHERE A.id IN (
        SELECT place_id FROM place_amenity 
        WHERE amenity_id 
        IN(?)
        GROUP BY place_id
        HAVING count(place_id) >= ?
    )
    AND A.price_by_night <= ? AND A.max_guest >= ? AND A.number_rooms >= ? LIMIT 1;`

    let safeQuery = mysql.functions.format(query, [criteria.amenities, criteria.amenities.length, criteria.price, criteria.guests, criteria.number_rooms]);
    
    return querySql(safeQuery);
}

function getAmenities(criteria) { //this function is just to display amenities 
    let query = `SELECT amenities.name from place_amenity
    JOIN amenities ON  place_amenity.amenity_id = amenities.id
    JOIN places ON places.id = place_amenity.place_id
    where place_amenity.place_id = (
    SELECT A.id
    
        FROM amenities 
        JOIN place_amenity ON place_amenity.amenity_id = amenities.id
    JOIN places A ON A.id = place_amenity.place_id 
        JOIN cities B on A.city_id = B.id
        JOIN states C on C.id = B.state_id
        JOIN users D ON A.user_id = D.id
        WHERE A.id IN (
        SELECT place_id FROM place_amenity 
        WHERE amenity_id 
        IN(?)
        GROUP BY place_id
        HAVING count(place_id) >= ?
    )
    AND A.price_by_night <= ? AND A.max_guest >= ? AND A.number_rooms >= ? LIMIT 1);`


          

    let safeQuery = mysql.functions.format(query, [criteria.amenities, criteria.amenities.length, criteria.price, criteria.guests, criteria.number_rooms]);
    
    return querySql(safeQuery);
}

function findListings(criteria) {
    let selectQuery = `SELECT A.*, B.name as cityName, C.name as stateName, A.id as pid FROM places A
        JOIN cities B ON A.city_id = B.id
        JOIN states C on B.state_id = C.id
        WHERE number_rooms >= ? AND state_id = ? AND city_id = ?`; //this functions for second page in many listings
    let safeQuery = mysql.functions.format(selectQuery, [criteria.number_rooms, criteria.stateId,  criteria.cityId]);
    return querySql(safeQuery);
}

function findings(criteria){
    let sQuery = `SELECT A.*, B.name as cityName, C.name as stateName, users.* FROM places A
    JOIN users ON users.id = A.user_id
    JOIN cities B ON A.city_id = B.id
    JOIN states C on B.state_id = C.id where A.id = ?`;
    let safeQuery = mysql.functions.format(sQuery, [criteria.cityId]);






    return querySql(safeQuery);
}

function extended(criteria){ //this function is just to display amenities 
    let extendedQuery = `SELECT amenities.name, A.id, A.number_rooms, A.max_guest, A.price_by_night FROM places A
    join place_amenity on place_amenity.place_id = A.id
    join amenities on place_amenity.amenity_id = amenities.id
    where A.id = ?`;
    let safeQuery = mysql.functions.format(extendedQuery, [criteria.placeId]);
    return querySql(safeQuery);
}






module.exports = {
    "findListing": findListing,
    "findListings": findListings,
    "findings" : findings,
    "extended" : extended,
    "getAmenities" : getAmenities
};


/*****************************************************************
 *        You can ignore everything below here!
 *****************************************************************/

// don't worry too much about this function! 
// it has been written to return the data from your database query
// *** it DOES NOT need modifying! ***
function querySql(sql) {
    let con = mysql.getCon();

    con.connect(function(error) {
        if (error) {
          return console.error(error);
        } 
      });

    return new Promise((resolve, reject) => {
        con.query(sql, (error, sqlResult) => {
            if(error) {
                return reject(error);
            }           

            return resolve(sqlResult);
        });

        con.end();
    });
}
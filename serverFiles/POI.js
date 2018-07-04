var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var DButilsAzure = require('./DButils');

//route Display3RandomPopPoints
router.get('/Display3RandomPopPoints',function(req,resulte){

    let top=`SELECT TOP 3 * FROM Points WHERE rankAvg>=3 ORDER BY NEWID()  `;
    DButilsAzure.execQuery(top).then(function(res){
        resulte.json(res);
    });
});

//getNumberofTimesViewsAtPoint

router.get('/accounts/getNumberofTimesViewsAtPoint',function (req,resulte) {
   let pointId=req.query.PointID;
   let select=`SELECT numberOfReview FROM Points WHERE pointID='${pointId}'`;
   DButilsAzure.execQuery(select).then(function (res) {
       resulte.json(res[0]);
   });

});

router.get('/getPointInfo',function(req,resulte){
    let pointId=req.query.PointID;
    let select=`SELECT * FROM Points WHERE pointID='${pointId}'`;
    let promise=DButilsAzure.execQuery(select);
    promise.then(function(res){
        if(res.length==0){
            resulte.send("this point isnt exists");
        }
        else{
            let upd=`UPDATE Points Set  numberOfReview = ${res[0].numberOfReview}+1 WHERE pointID='${pointId}' `;
            let promise=DButilsAzure.execQuery(upd);
            resulte.json(res[0]);
        }
    })
});

router.get('/accounts/Get2LastPointSaved',function(req,resulte){
    let token=req.decoded.payload;
    let username=token.username;
    let get=`SELECT TOP 2 * FROM Favorite_Points INNER JOIN Points 
ON Favorite_Points.pointID=Points.pointID WHERE username='${username}' ORDER BY time DESC `;
        DButilsAzure.execQuery(get).then(function(res){
            resulte.json(res);
        });
});

router.get('/Get2LastReviewWithDate',function(req,resulte){
    let pointId=req.query.PointID;
    let get=`SELECT TOP 2 * FROM Users_Comment WHERE pointID='${pointId}' ORDER BY time DESC `;
        DButilsAzure.execQuery(get).then(function(res){
            resulte.json(res);
        });
});

router.get('/accounts/GetRecommendPoint',function (req,resulte){
    let token=req.decoded.payload;
    let username=token.username;

       let query=`SELECT TOP 2 * FROM Users_Categories INNER JOIN Points ON Users_Categories.category= Points.category WHERE username='${username}'`
        DButilsAzure.execQuery(query).then(function (res) {
           resulte.json(res);
        });

});

router.put('/accounts/AddPointToFavoriteList', function(req,resulte) {
    let token = req.decoded.payload;
    let username = token.username;
    let pointId = req.body.PointID.trim();
    let check = `SELECT * FROM Favorite_Points WHERE username='${username}' AND pointID='${pointId}'`;
    let insert = `INSERT INTO Favorite_Points VALUES ('${username}','${pointId}',CURRENT_TIMESTAMP,NULL)`;
    DButilsAzure.execQuery(check).then(function (res) {
        if (res.length == 0) {
                DButilsAzure.execQuery(insert);
                resulte.sendStatus(200);
        }
        else
            {
                resulte.send("this point already in your favorite");
            }

    });
});

router.delete('/accounts/DeletePointFromFavoriteList', function(req,resulte) {
    let token = req.decoded.payload;
    let username = token.username;
    let pointId = req.query.PointID;
    let check = `SELECT * FROM Favorite_Points WHERE username='${username}' AND pointID='${pointId}'`;
    let deletee = `DELETE FROM Favorite_Points WHERE username='${username}' AND pointID='${pointId}'`;
    DButilsAzure.execQuery(check).then(function (res) {
        if (res.length == 0) {
            resulte.send("this point  isnt in your favorite");

        }
        else
        {
                DButilsAzure.execQuery(deletee);
                resulte.sendStatus(200);
        }

    });
});

router.delete('/accounts/DeleteAll', function(req,resulte) {
    let token = req.decoded.payload;
    let username = token.username;
    let deletee = `DELETE FROM Favorite_Points WHERE username='${username}'`;

            DButilsAzure.execQuery(deletee);
            resulte.sendStatus(200);



});

router.get('/accounts/getIntrestingPointsOfUser',function(req,resulte){
    let token=req.decoded.payload;
    let username =token.username;

        let bring=`SELECT * FROM Favorite_Points INNER JOIN Points ON Favorite_Points.pointID=Points.pointID WHERE username='${username}' ORDER BY mySort ASC`;
        DButilsAzure.execQuery(bring).then(function(res){
            resulte.json(res);
        });
});

router.get('/getPointsByCategory',function (req,resulte) {
   let category=req.query.Category;
    let bring=`SELECT * FROM Points WHERE category='${category}'`;
    DButilsAzure.execQuery(bring).then(function(res){
        resulte.json(res);
    });
});


router.get('/getPoints',function (req,resulte) {
    let select='SELECT * FROM Points';
    DButilsAzure.execQuery(select).then(function(res){
        resulte.json(res);
    });
});

router.put('/accounts/setMySort',function(req,resulte) {
    let token = req.decoded.payload;
    let username = token.username;
    let arr = req.body.Arr

    for (let i = 0; i < arr.length; i++) {
        let insert = `update Favorite_Points set mySort= ${arr[i].mysort} where pointID='${arr[i].pid}' and  username='${username}'`;
        DButilsAzure.execQuery(insert);
    }
    let alt=`ALTER TABLE Favorite_Points ORDER BY mySort DESC`;
    DButilsAzure.execQuery(alt);
    resulte.json("success");

});
module.exports = router;
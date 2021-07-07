var express = require('express');
var pool = require('./pool');
var router = express.Router();
var upload = require('./upload.js');

/* GET home page. */
router.post('/addnewgames', upload.any(),function(req, res, next) {
    console.log("Body...",req.body)
    pool.query("insert into games (categoryid,subcategoryid,gamename,description,picture,price,stock,rented,rentamt,offer) values(?,?,?,?,?,?,?,?,?,?)",
    [req.body.categoryid,req.body.subcategoryid,
        req.body.gamename,req.body.description,
        req.files[0].originalname,req.body.price,
        req.body.stock,req.body.rented,req.body.rentamt,req.body.offer], function (error,result){

            if(error)
            {console.log("Error",error)
                res.status(500).json({result:false})
            }
            else
            {
                res.status(200).json({result:true})
            }
        });
});


router.get('/displayAll',function(req,res){
    pool.query("select G.*,(select C.categoryname from categories C where C.categoryid=G.categoryid) as cname,(select S.subcategoryname from subcategory S where S.subcategoryid=G.subcategoryid) as subname from games G", function(error,result){
        if(error)
        {
            res.status(500).json([])
        }
        else{
            res.status(200).json(result)
        }
    } )
});

router.post('/editicon', upload.single('picture'), function (req, res, next) {
    console.log("BODY ==>", req.body);
    pool.query("update games set picture=? where gameid=?", [req.file.originalname,req.body.gameid], function (error, result) {
        if (error) {
           
            res.status(500).json({ result: false });
        }
        else {
            
            res.status(200).json({ result: true });
        }
    });

});


router.post('/editgamedata', function (req, res, next) {

    pool.query("update games set gamename=?,description=?,price=?,stock=?, rented=?,rentamt=?,offer=? where gameid=?", [req.body.gamename, req.body.description, req.body.price,req.body.stock,req.body.rented,req.body.rentamt,req.body.offer, req.body.gameid], function (error, result) {
        if (error) {
            console.log(req.body)
            res.status(500).json({ result: false });
        }
        else {
            res.status(200).json({ result: true });
        }
    });

});

router.post('/deletegame', function (req, res, next) {

    pool.query("delete from games where gameid=?", [req.body.gameid], function (error, result) {
        if (error) {
            res.status(500).json({ result: false });
        }
        else {
            res.status(200).json({ result: true });
        }
    });

});


router.get('/gameoffers',function(req,res){
    pool.query("select * from games where offer>0", function(error,result){
        if(error)
        {
            res.status(500).json([])
        }
        else{
            res.status(200).json(result)
        }
    } )
});

router.post('/Displaygamesbysubcategoryid', function(req,res){
    pool.query("select * from games where subcategoryid=?",[req.body.subcategoryid],function(error,result){
        if(error)
        {
            res.status(500).json([])
        }
        else
        {
            res.status(200).json(result)
        }

    });
});

module.exports = router;

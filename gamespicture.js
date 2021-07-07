var express = require('express');
var router = express.Router();
var pool = require('./pool.js');
var upload = require('./upload.js');

/* GET home page. */
router.post('/addnewgamespicture', upload.any(), function(req, res, next) {
    console.log(req.body)
    console.log(req.files)
    var q="insert into gamespicture (categoryid,subcategoryid,gameid,image) values ?"
    pool.query(q,[req.files.map((items)=>
    [
        req.body.categoryid,
        req.body.subcategoryid,
        req.body.gameid,
        items.originalname
    ]),],
    function(error,result){
        if(error)
        {console.log('Error',error)
            res.status(500).json({result:false})
        }
        else{
            res.status(200).json({result:true})
        }

    });
});


router.get('/Displaygamespicture', function(req,res){
    console.log("Error",req.body)
    pool.query("select S.*,(select C.categoryname from categories C where C.categoryid=S.categoryid) as cname,(select sub.subcategoryname from subcategory sub where sub.subcategoryid=S.subcategoryid) as subname,(select gm.gamename from games gm where gm.gameid=S.gameid) as gname from gamespicture S",function(error,result){
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

router.post('/editicon', upload.single('image'), function (req, res, next) {

    pool.query("update gamespicture set image=? where imageid=?", [req.file.originalname,req.body.imageid], function (error, result) {
        if (error) 
        {
            res.status(500).json({ result: false });
        }
        else 
        {
            res.status(200).json({ result: true });
        }
    });

});

router.post('/deletegamespicture', function (req, res, next) {

    pool.query("delete from gamespicture where imageid=?", [req.body.imageid], function (error, result) {
        if (error) {
            res.status(500).json({ result: false });
        }
        else {
            res.status(200).json({ result: true });
        }
    });

});

router.post('/editgamespicturedata', function (req, res, next) {
    console.log("body",req.body)
        pool.query("update gamespicture set categoryid=?,subcategoryid=?,gameid=? where imageid=?", [req.body.categoryid, req.body.subcategoryid, req.body.gameid, req.body.imageid], function (error, result) {
            if (error) {
                console.log(req.body)
                res.status(500).json({ result: false });
            }
            else {
                res.status(200).json({ result: true });
            }
        });
    
    });

    router.post('/displayallgamespictures', function(req,res){
        console.log("Error",req.body)
        pool.query("select * from gamespicture where gameid=?",[req.body.gameid],function(error,result){
            if(error)
            {
                res.status(500).json([])
            }
            else
            {console.log(result)
                res.status(200).json(result)
            }
    
        });
    });

module.exports = router;


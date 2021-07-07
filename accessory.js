var express = require('express');
const pool = require('./pool');
var router = express.Router();
var upload = require('./upload.js');

/* GET home page. */
router.post('/addnewaccessories',upload.any(), function(req, res, next) {
    console.log("Body",req.body)
    pool.query("insert into accessories (categoryid,subcategoryid,accessoryname,description,picture,stock,rented,rentamt,offer) values(?,?,?,?,?,?,?,?,?)",
    [req.body.categoryid,req.body.subcategoryid,req.body.accessoryname,
    req.body.description,req.files[0].originalname,req.body.stock,req.body.rented,
    req.body.rentamt,req.body.offer],function (error,result){
        if(error)
        {console.log(error)
            res.status(500).json({result:false})
        }
        else
        {
            res.status(200).json({result:true})
        }

    });


});

router.get('/Displayaccessory', function(req,res){
    console.log("Error",req.body)
    pool.query("select S.*,(select C.categoryname from categories C where C.categoryid=S.categoryid) as cname,(select sub.subcategoryname from subcategory sub where sub.subcategoryid=S.subcategoryid)as subname from accessories S",function(error,result){
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

router.post('/editicon', upload.single('picture'), function (req, res, next) {

    pool.query("update accessories set picture=? where accessoryid=?", [req.file.originalname,req.body.accessoryid], function (error, result) {
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



router.post('/editaccessorydata', function (req, res, next) {
   
        pool.query("update accessories set accessoryname=?,description=?, stock=?,rented=?,rentamt=?,offer=? where accessoryid=?", [req.body.accessoryname, req.body.description, req.body.stock,req.body.rented,req.body.rentamt,req.body.offer, req.body.accessoryid], function (error, result) {
            if (error) {
                console.log(req.body)
                res.status(500).json({ result: false });
            }
            else {
                res.status(200).json({ result: true });
            }
        });
    
    });

    router.post('/deleteaccessory', function (req, res, next) {

        pool.query("delete from accessories where accessoryid=?", [req.body.accessoryid], function (error, result) {
            if (error) {
                res.status(500).json({ result: false });
            }
            else {
                res.status(200).json({ result: true });
            }
        });
    
    });


    router.get('/accessoryoffers', function(req,res){
        pool.query("select * from accessories where offer>0",function(error,result){
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

    router.post('/Displayaccessorybysubcategoryid', function(req,res){
        pool.query("select * from accessories where subcategoryid=?",[req.body.subcategoryid],function(error,result){
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

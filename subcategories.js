var express = require('express');
var router = express.Router();
var pool = require('./pool.js');
var upload = require('./upload.js');





/* GET home page. */
router.post('/addnewsubcategory', upload.any(), function (req, res, next) {
    console.log("BODY ==>", req.body);
    pool.query("insert into subcategory (categoryid,subcategoryname,description,icon,ad,adstatus,stock,rented,rentamt,offer,price) values(?,?,?,?,?,?,?,?,?,?,?)", [req.body.categoryid,req.body.subcategoryname, req.body.description, req.files[0].originalname, 
    req.files[1].originalname, req.body.adstatus, req.body.stock, req.body.rented,req.body.rentamt,req.body.offer,req.body.price], function (error, result) {
        if (error) {
            console.log("rrrrr", error)
            res.status(500).json({ result: false });
        }
        else {
            console.log("sssss", result)
            res.status(200).json({ result: true });
        }
    });

});


router.get('/Displaysubcategory', function(req,res){
    pool.query("select S.*,(select C.categoryname from categories C where C.categoryid=S.categoryid) as cname from subcategory S",function(error,result){
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

router.post('/editicon', upload.single('icon'), function (req, res, next) {
    console.log(req.body)
    pool.query("update subcategory set icon=? where subcategoryid=?", [req.file.originalname,req.body.subcategoryid], function (error, result) {
        if (error) 
        { console.log(req.body)
            res.status(500).json({ result: false });
        }
        else 
        {
            res.status(200).json({ result: true });
        }
    });

});

router.post('/editad', upload.single('ad'), function (req, res, next) {
    console.log(req.body)
    pool.query("update subcategory set ad=? where subcategoryid=?", [req.file.originalname,req.body.subcategoryid], function (error, result) {
        if (error) {
            res.status(500).json({ result: false });
        }
        else {
            res.status(200).json({ result: true });
        }
    });

});

router.post('/editsubcategorydata', function (req, res, next) {
    console.log(req.body)
        pool.query("update subcategory set subcategoryname=?,description=?,adstatus=?, stock=?,rented=?,rentamt=?,offer=?,price=? where subcategoryid=?", 
        [req.body.categoryname, req.body.description, req.body.adstatus, req.body.stock,req.body.rented,req.body.rentamt,req.body.offer,req.body.price, req.body.subcategoryid], function (error, result) {
            if (error) {
                console.log(req.body)
                res.status(500).json({ result: false });
            }
            else {
                res.status(200).json({ result: true });
            }
        });
    
    });

    router.post('/deletesubcategory', function (req, res, next) {
console.log("body...",req.body)
        pool.query("delete from subcategory where subcategoryid=?", [req.body.subcategoryid], function (error, result) {
            if (error) {console.log("Error",error)
                res.status(500).json({ result: false });
            }
            else {
                res.status(200).json({ result: true });
            }
        });
    
    });


    router.get('/subcategoryoffers', function(req,res){
        pool.query("select * from subcategory where offer>0",function(error,result){
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


    router.post('/Displaysubcategorybycategoryid', function(req,res){
        pool.query("select * from subcategory where categoryid=?",[req.body.categoryid],function(error,result){
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

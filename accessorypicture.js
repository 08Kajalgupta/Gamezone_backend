var express = require('express');
var router = express.Router();
var pool = require('./pool.js');
var upload = require('./upload.js');

/* GET home page. */
router.post('/addnewaccessorypicture', upload.any(), function(req, res, next) {
    console.log(req.body)
    console.log(req.files)
    var q="insert into accessoriespicture (categoryid,subcategoryid,accessoryid,image) values ?"
    pool.query(q,[req.files.map((items)=>
    [
        req.body.categoryid,
        req.body.subcategoryid,
        req.body.accessoryid,
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


router.get('/Displayaccessorypicture', function(req,res){
    console.log("Error",req.body)
    pool.query("select S.*,(select C.categoryname from categories C where C.categoryid=S.categoryid) as cname,(select sub.subcategoryname from subcategory sub where sub.subcategoryid=S.subcategoryid) as subname,(select ac.accessoryname from accessories ac where ac.accessoryid=S.accessoryid) as acname from accessoriespicture S",function(error,result){
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

    pool.query("update accessoriespicture set image=? where imageid=?", [req.file.originalname,req.body.imageid], function (error, result) {
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

router.post('/deleteaccessorypicture', function (req, res, next) {

    pool.query("delete from accessoriespicture where imageid=?", [req.body.imageid], function (error, result) {
        if (error) {
            res.status(500).json({ result: false });
        }
        else {
            res.status(200).json({ result: true });
        }
    });

});

router.post('/editaccessorypicturedata', function (req, res, next) {
    console.log("body",req.body)
        pool.query("update accessoriespicture set categoryid=?,subcategoryid=?,accessoryid=? where imageid=?", [req.body.categoryid, req.body.subcategoryid, req.body.accessoryid, req.body.imageid], function (error, result) {
            if (error) {
                console.log(req.body)
                res.status(500).json({ result: false });
            }
            else {
                res.status(200).json({ result: true });
            }
        });
    
    });

module.exports = router;


var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload=require('./upload.js')

/* GET home page. */
router.post(
    "/adddocuments",
    upload.single("icon"),
    function (req, res, next) {
    console.log(req.body);
      pool.query(
        "insert into documents(documents)values(?)",
        [
        
          req.body.documents,
         
        ],
        function (err, result) {
          if (err) {
            console.log(err);
            res.status(500).json({ result: false });
          } else {
            res.status(200).json({ result: true });
          }
        }
      );
    }
  );

  router.get('/displayall',function(req,res) {

    pool.query("select * from documents",function(error,result){
      
        if(error)
        {
            res.status(500).json([])
        }
        else
        {
           
            res.status(200).json(result)
        }
    })
  //res.render('index', { title: 'Express' });
});

router.post('/editdocuments', function(req, res, next) {
    pool.query("update documents set documents=? where id=?",[req.body.documents,req.body.id],function(error,result){
    console.log(result)
    if(error)
    {console.log(error)
        res.status(500).json({result:false})
    }
    else
    { 
        res.status(200).json({result:true})
    }
    }) 
    });  

    router.post('/deletedocuments', function(req, res, next) {
        pool.query(
       " delete from documents  where id=?",[req.body.id],function(error,result){
                   console.log(result)
                   if(error)
                   {console.log(error)
                       res.status(500).json({result:false})
                   }
                   else
                   { 
                       res.status(200).json({result:true})
                   }
                   }) 
                   });
       
     
module.exports = router;
var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload=require('./upload.js')

/* GET home page. */
router.post(
    "/addconditioned",
    upload.single("icon"),
    function (req, res, next) {
    console.log(req.body);
      pool.query(
        "insert into terms(conditioned)values(?)",
        [
        
          req.body.conditioned,
         
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

    pool.query("select * from terms",function(error,result){
      
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



    

    router.post('/editconditioned', function(req, res, next) {
        pool.query("update terms set conditioned=? where termsid=?",[req.body.conditioned,req.body.termsid],function(error,result){
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
         
            
router.post('/deleteconditioned', function(req, res, next) {
 pool.query(
" delete from terms  where termsid=?",[req.body.termsid],function(error,result){
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
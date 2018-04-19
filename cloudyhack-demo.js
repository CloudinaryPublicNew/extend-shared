/**
* @param context {WebtaskContext}
*/

var cloudinary = require("cloudinary");

function findByTag(context, cb){
  
  var options ={context:true, tags:true, max_results:500};

     cloudinary.v2.api.resources_by_tag("imageCon", options,
      function(error, result){
        if(error){
          cb(error);
        }
        console.log(result); 
        cb(null, result);
      });
  
}



module.exports = function(context, cb) {
  
  
   cloudinary.config({
      "cloud_name": context.secrets.cloud_name,
      "api_key":  context.secrets.api_key,
      "api_secret": context.secrets.api_secret
    });

findByTag(context, cb);
 
};
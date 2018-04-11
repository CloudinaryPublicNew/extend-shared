/**
* @param context {WebtaskContext}
*/

var cloudinary = require("cloudinary");

function findByTag(context, cb){
  
  cloudinary.api.resourcesBy()
  
}



module.exports = function(context, cb) {
  
  
   cloudinary.config({
      "cloud_name": context.secrets.cloud_name,
      "api_key":  context.secrets.api_key,
      "api_secret": context.secrets.api_secret
    });

findByTag(context, cb);
 
};
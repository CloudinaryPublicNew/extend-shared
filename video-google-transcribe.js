/**
* @param context {WebtaskContext}
* https://www.npmjs.com/package/parse-filepath
* Requires cloudinary and parse-filepath
* Pass a url  or public_id 
* https://evangelism.cloudinary.auth0-extend.com/video-google-transcribe?url=<url to resource>>&auth_key=<auth_key>
* https://evangelism.cloudinary.auth0-extend.com/video-google-transcribe?public_id=<url to resource>&auth_key=<auth_key>
*/


var cloudinary = require('cloudinary');
var parsePath = require('parse-filepath');



module.exports = function(context, cb) {
  
  if(context.secrets.WT_API_KEY != context.data.auth_key){
    const message = 'You are not authorized to use this api without an auth_key';
    return  cb(null, message);
  }

  
   cloudinary.config({
      "cloud_name": context.secrets.cloud_name,
      "api_key": context.secrets.api_key,
      "api_secret": context.secrets.api_secret
    });
    
    // upload
    
    if(context.data.url){
      transcribeURL(context,cb);
    }
    
       
    // explicit  update
    if(context.data.public_id){
      transcribe(context,cb);
    }

   
};


function transcribe(context,cb){
  
  var public_id = context.data.public_id ||'test-audio';
 
  // explicit 
  cloudinary.v2.uploader.explicit(public_id, 
        { 
        public_id: public_id,  
        type: "upload",
        resource_type: "video", 
        raw_convert: "google_speech",
        notification_url: "https://cloudinary.auth0-extend.com/api/run/evangelism/cloudinary-webhook"
        }, 
    function(error, result) {
      if(error){
        console.log(error); 
             cb( error);
      }
      if(result){
        console.log(result); 
       cb(null, result);
      }
    });
  
}


function transcribeURL(context,cb){
  
  var url = context.data.url || 'http://res.cloudinary.com/de-demo/video/upload/v1520429530/test-audio.mp3' ; 
  
  var public_id =  parsePath(url).name + "-test";
  
  // explicit 
  cloudinary.v2.uploader.upload(url, 
        { 
        public_id: public_id,  
        type: "upload",
        resource_type: "video", 
        raw_convert: "google_speech",
        notification_url: "https://cloudinary.auth0-extend.com/api/run/evangelism/cloudinary-webhook"
        }, 
    function(error, result) {
      if(error){
        console.log(error); 
             cb( error);
      }
      if(result){
        console.log(result); 
       cb(null, result);
      }
    });
  
}

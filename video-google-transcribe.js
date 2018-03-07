/**
* @param context {WebtaskContext}
* https://www.npmjs.com/package/parse-filepath
* Requires cloudinary and parse-filepath
*/


var cloudinary = require('cloudinary');
var parsePath = require('parse-filepath');



module.exports = function(context, cb) {
  
   cloudinary.config({
      "cloud_name": context.secrets.cloud_name,
      "api_key": context.secrets.api_key,
      "api_secret": context.secrets.api_secret
    });
    
    transcribe(context,cb);
    //transcribeURL(context,cb);
};

 
//https://res.cloudinary.com/de-demo/video/upload/v1520283833/demo-song.mp3

function transcribe(context,cb){
  
  var public_id = context.data.public_id ||'demo-song';
  // 'https://res.cloudinary.com/de-demo/video/upload/v1520283833/demo-song.mp3' ; 
  //'demo-song.mp3';
  // explicit 
  cloudinary.v2.uploader.explicit(public_id, 
        { 
        public_id: 'demo-song',  
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
  
  var public_id =  parsePath(url).name;
  
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
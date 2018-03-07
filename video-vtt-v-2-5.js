
/**
requires: 
cloudinary@1.10.0
axios@0.18.0
watson-developer-cloud@3.0.7
moment@2.20.1
*/

const cloudinary = require('cloudinary');
const moment = require('moment');
const axios = require('axios');

function saveAsVTT(data, name, context, cb){
 
 const cloudname = context.data.cloudname || 'de-demo';  
 const dataB64 = new Buffer(data).toString("base64");
 
 // format to B64 data:
 const textData = 'data:text/vtt;base64,' + dataB64;
 
const filename = name + ".vtt";

const options = { public_id:filename, resource_type: 'raw'};  
const vttURL = "https://res.cloudinary.com/" + cloudname+ "/raw/upload/v1516908977/" + name;  

console.log(vttURL);
console.log('calling upload');

  cloudinary.v2.uploader['upload'](textData,
    options,
    function(error, result) { 
      if(error){
        console.log(error);
        return cb(null, error); 
      }
      if(result){
        console.log(result);
          return cb(null,result);    
      }
    });
}



function translate(data, name, context,cb,flag){
  
   const LanguageTranslatorV2 = require('watson-developer-cloud/language-translator/v2');

   const config = { 
      username: context.secrets.watson_username,
      password: ccontext.secrets.watson_password,
      url: context.secrets.watson_url
     }

   const languageTranslator = new LanguageTranslatorV2(config);

    const options = {
      "text": [data],
      "source": "en",
      "target": "es"
    }

languageTranslator.translate(options,
  function(err, translation) {
    if (err)  {
      console.log('error:', err);
      cb(err);
    } else  {
      console.log(JSON.stringify(translation, null, 2));
      var translatedData = translation.translations[0].translation;
      saveAsVTT(translatedData, name, context, cb)
      // cb(null, translatedData); 
    }
  }); 
}

function getTranscript(context,cb){

const cloudname = context.data.cloudname || 'de-demo';    
const public_id =  context.data.publicid || 'lincoln'; 
const pid = public_id.split('.')[0] 

const transcriptURL = "https://res.cloudinary.com/" + cloudname+ "/raw/upload/" + pid + ".transcript";  
console.log(transcriptURL);
  
  axios.get(transcriptURL)
  .then(function (response) {
    var data = response.data;
    console.log(data);
    createVTT(data, context, cb);
  })
  .catch(function (error) {
    console.log(error);
      cb(error);
  });

}


function createVTT(data, context,cb){
var public_id =  context.data.publicid || 'lincoln'; 
var name = public_id.split('.')[0] 
 
    var nodedata = [];
 
    for (var i = data.length - 1; i >= 0; i--) {
      var item = {};
      var wordsLen = data[i].words.length;
      var transcript = data[i].transcript;
      var start = data[i].words[0].start_time;
      var end = data[i].words[wordsLen-1].end_time;   

      item.start_time = moment("2015-01-01").startOf('day').seconds(start).format('HH:mm:ss.SSS');
      item.end_time =  moment("2015-01-01").startOf('day').seconds(end).format('HH:mm:ss.SSS');
      item.transcript = transcript;
      nodedata.push(item);
    }

  var text = [];
      text.push('WEBVTT');
      text.push('\n');
    
    nodedata = nodedata.reverse();
     
    for (var x = 0; x < nodedata.length; x++) {
          var line =  nodedata[x].transcript;
          var time =  nodedata[x].start_time + ' --> ' + nodedata[x].end_time;
          text.push(x + 1);
          text.push(time);
          text.push(line);
          text.push('\n');
    }

    text.push('NOTE end of file');
    var vttString = text.join('\n');
      console.log(vttString);
   // now save results as vtt
     saveAsVTT(vttString, name, context, cb);
}

module.exports = function(context, cb) {
// config cloudinary  
  cloudinary.config({
      "cloud_name": context.secrets.cloud_name,
      "api_key": context.secrets.api_key,
      "api_secret": context.secrets.api_secret
    });

     getTranscript(context,cb);
};


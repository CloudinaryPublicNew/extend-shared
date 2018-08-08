/**
* 
* 
*/
module.exports = function(context, cb) {
  console.log(context.data);
  console.log(context.data.info.ocr.adv_ocr);
  cb(null, { message:'webhook called see wt logs'});
};

/**
* 
* 
*/
module.exports = function(context, cb) {
  console.log(context.data);
  cb(null, { message:'webhook called see wt logs'});
};

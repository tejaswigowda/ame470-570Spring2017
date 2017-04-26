/**
 * @exports JsonFilter
 */
module.exports = (function () {

   /**
    * @name JsonFilter
    * @constructor
    */
   function JsonFilter() {
   }

   /**
    * Middleware function for express or connect server.
    */
   JsonFilter.prototype.middleware = function() {
      return function(req, res, next) {
         if(JsonFilter.jsonMimeType.test(req.headers.accept) || req.query.json !== undefined) {
            req.isJson = req.query.json || true;
            res.render = JsonFilter.render;
         }
         else {
            req.isJson = false;
         }
         next();
      }
   };

   JsonFilter.jsonMimeType = /application\/json/;

   JsonFilter.render = function(viewName, model) {
      this.send(model);
   };

   return new JsonFilter;

}());

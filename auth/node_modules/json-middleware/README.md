# About

Automatically send model data as JSON instead of passing to the view renderer when the user agent sends an `Accept`
type of `application/json` or adds a `json` parameter to the query string.

# Installation

Installing through [npm](http://npmjs.org) is as easy as:

    npm install json-middleware

# Usage

To plug the middleware into a Connect or [Express](http://expressjs.com/) server:

    var app = require('express')();
    app.use(require('json-middleware').middleware());

When the middleware component runs, an `isJson` property is attached to the request. The value of the `isJson` property
will either be `true` when the `Accept` header is set to `application/json`, or it will be set to whatever the `json`
query string parameter value was.

To send a response as JSON instead of the usual view renderer, just call `res.render` as normal:

    app.get('/', function(req, res) {
       res.render("index", myDataObject);
    });

In this case, when the response is to be rendered as JSON, `myDataObject` will be sent as a JSON response instead of
being passed to whatever view engine has been set up (eg: [hogan-middleware](git://github.com/steveukx/hogan-middleware))

# Example

    app.use(require('json-middleware').middleware());

    app.get('/', function(req, res) {
       console.log(req.isJson);
       res.render("index", req.session); // render the index view with all data from the session
    });

When accessing `/`, the `index` view is rendered with data held in the `req.session` object. Accessing `/?json=on`
result in the `req.session` object being sent to the client as JSON and the console will print `on`.

Accessing `/` with the `Accept` request header set to `application/json` will result in the console printing `true`
and the `req.session` object being sent to the client as JSON.

# Note

Only the `req.render` function is altered, all other utilities for responding to requests (eg: `req.send`) are left
untouched.


# License

Released under the [MIT](http://opensource.org/licenses/MIT) license. In short usage is free for any purpose, with the
usual lack of warranties either explicit or implied.




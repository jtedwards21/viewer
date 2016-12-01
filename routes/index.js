const express = require("express");
const router = express.Router();

import { renderToString } from "react-dom/server";
import App from "../public/javascripts/components/app";
import React from "react";
import request from "request";

router.get("/pages/:query", function(req, res) {
  var url = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=' + req.params.query;

  var options = {url: url}
  var callback = function(err, response, body){ res.send(body);}
  request(options, callback);
})

/* GET home page. */
router.get("/", function(req, res) {
  const markup = renderToString(<App />);

  res.render("index", {
    title: "Express",
    markup: markup
  });
});

module.exports = router;

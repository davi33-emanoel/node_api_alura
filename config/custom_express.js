const express = require("express")
const consign = require("consign")
const body_parser = require("body-parser")

module.exports = () => {
  const app = express();
    
  app.use(body_parser.urlencoded({extended:true}))
  app.use(body_parser.json())
    
  consign()
    .include("controllers")
    .into(app);

  return app;
};

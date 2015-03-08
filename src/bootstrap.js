require("babel/register")({
  experimental: true,
  ignore: /node_modues/
});
require("./browser/main");

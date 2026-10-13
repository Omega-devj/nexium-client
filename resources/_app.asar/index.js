// Point d entree de l application Discord d origine (charge par le patcher).
// Ajoute resources/modules aux chemins de recherche de Node, puis demarre.
const join = require("path").join;
const paths = require("./paths");
paths.init();
const modulesDir = join(paths.getExeDir(), "resources", "modules");
require("module").globalPaths.push(modulesDir);
const originalResolveLookupPaths = require("module")._resolveLookupPaths;
require("module")._resolveLookupPaths = (request, parent) => {
  if (parent?.paths?.length > 0) {
    parent.paths = parent.paths.concat(require("module").globalPaths);
  }
  return originalResolveLookupPaths(request, parent);
};
require("./bootstrap")();

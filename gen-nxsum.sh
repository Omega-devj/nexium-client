#!/usr/bin/env bash
# Régénère resources/equicord/renderer.js.nxsum à partir de renderer.js.
# Même djb2 que validRenderer() dans resources/app.asar/index.js.
set -e
cd "$(dirname "$0")"
node gen-nxsum.js "$@"

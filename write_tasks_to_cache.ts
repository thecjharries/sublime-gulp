import * as crypto from "crypto";
import * as fs from "fs";
import * as minimist from "minimist";
import * as path from "path";

function loadDefaults() {
//
}

const sha1 = crypto.createHash("sha1");

const cwd = process.cwd();

const cachePath = path.join(cwd, ".sublime-gulp-cache");
const tmpFilePath = path.join(cwd, ".sublime-gulp-tmp.js");
// const gulpFilePath =;

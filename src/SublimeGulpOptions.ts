import * as crypto from "crypto";
import * as fse from "fs-extra";
import * as minimist from "minimist";
import * as path from "path";

export interface ISublimeGulpConfig {
    [key: string]: any;
}

export interface ISublimeGulpPaths {
    cwd: string;
    cache: string;
    tmp: string;
    gulpfile: string;
}

export class SublimeGulpOptions {
    private defaults: ISublimeGulpConfig;
}

/* tslint:disable-rule:no-console */
import * as Bluebird from "bluebird";
import * as crypto from "crypto";
import * as fse from "fs-extra";
import * as minimist from "minimist";
import * as path from "path";
import * as shell from "shelljs";

export interface ISublimeGulpConfig {
    test?: any;
    [key: string]: any;
}

export interface ISublimeGulpPaths {
    cwd: string;
    cache: string;
    tmp: string;
    gulpfile: string;
}

export class GulpLoader {
    private defaultOptions: ISublimeGulpConfig;
    private paths: ISublimeGulpPaths;
    private SETINGS_REGEX: RegExp = /gulp.sublime-settings$/i;
    private foundOptions: ISublimeGulpConfig[];

    public constructor() {
        this.defaultOptions = this.loadDefaultOptions();
        console.log(this.searchForOptions());
    }

    private loadDefaultOptions(): ISublimeGulpConfig {
        return fse.readFileSync(path.join(__dirname, "config", "defaults.json"));
    }

    private determineOptimalStartingDirectory(): string[] {
        // TODO: does this really need to be two arrays any more?
        if ("win32" === process.platform) {
            return [
                `${process.env.APPDATA}\\**\\*ulp.sublime-settings`,
            ];
        } else {
            return [
                "~/**/*ulp.sublime-settings",
            ];
        }
    }

    private searchForOptions() {
        return Array.from(new Set(this.determineOptimalStartingDirectory().map((pathGlobToSearch: string) => {
            const validPaths: string[] = [];
            for (const filepath of shell.find(pathGlobToSearch)) {
                filepath.match(this.SETINGS_REGEX) && validPaths.push(filepath);
            }
            return validPaths;
        }).reduce((a: string[], b: string[]) => {
            return a.concat(b);
        })));
    }

    private chooseOptionsToUse(filepaths: string[]): ISublimeGulpConfig {
        const options = { user: { mtime: 0, path: "" }, global: { mtime: 0, path: "" } };
        for (const filepath of filepaths) {
            const possibleMatch = filepath.match(/:(gulp|user)[\/\\]*gulp.sublime-settings$/i);
            if (possibleMatch && possibleMatch[1]) {
                const key = possibleMatch[1].toLowerCase();
                if (options[key].mtime > 0) {
                    const fileStats = shell.ls("-l", filepath);
                }
            }
        }
        return {};

    }

    // private pullProcessOptions(): ISublimeGulpConfig {
    //     return {
    //         "home"
    //     }
    // }

    // private determineGulpfilePaths()
}

new Bluebird((resolve, reject) => {
    (shell.config as any).verbose = true;
    const tester = new GulpLoader();
}).then(() => {
    console.log("Finished");
    process.exit(0);
});

// function loadDefaults() {
//     return fse.readFileSync(path.join(__dirname, "config", "defaults.json"));
// }

// const sha1 = crypto.createHash("sha1");

// const cwd = process.cwd();

// const cachePath = path.join(cwd, ".sublime-gulp-cache");
// const tmpFilePath = path.join(cwd, ".sublime-gulp-tmp.js");

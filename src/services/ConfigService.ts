/// <reference path="../../typings/typings.d.ts" />
import * as YAML from 'yamljs';
import * as path from 'path';
import fs = require('fs');

export class ConfigService {

  private static _instance: ConfigService = new ConfigService();

  private _appConfig: any;

  private _docsDir: string;

  private _siteRoot: string;

  private _configFileName: string = 'config.yaml';

  constructor() {
    if (ConfigService._instance) {
      throw new Error('Error: Instantiation failed: Use ConfigService.getInstance() instead of new.');
    }
    ConfigService._instance = this;
    console.log('ConfigService initialized');
    this._init();
  }

  public static getInstance(): ConfigService {
    return ConfigService._instance;
  }

  public static getDirConfig(file: string) {
    return YAML.load(file);
  }

  public static getFrontMatter(file: string) {
    var data = fs.readFileSync(file, 'utf8');
    var lines = data.split('\n');
    var fMatter = '';
    if (lines.length > 0) {
      if (lines[0] === '---') {
        for (var i = 1, iMax = lines.length; i < iMax; i++) {
          if (lines[i] === '---') {
            break;
          }
          fMatter += lines[i];
        }
        return YAML.parse(fMatter);
      } else {
        return null;
      }
    }
  }

  public getVersionFromConfig(dir: string) {
    var configFile = path.resolve(dir, this._configFileName);
    if (fs.existsSync(configFile)) {
      return ConfigService.getDirConfig(configFile).since;
    }
    return 0;
  }

  private _init(): void {
    this._docsDir = process.env.DOCS_SOURCE_FOLDER || '.';
    this._appConfig = YAML.load(path.resolve(this._docsDir, this._configFileName));
    this._siteRoot = process.env.WEBSITE_ROOT;
  }

  get docsDir() {
    return this._docsDir;
  }

  get siteRoot() {
    return this._siteRoot;
  }

  get appConfig() {
    return this._appConfig;
  }

  get configFileName() {
    return this._configFileName;
  }
}
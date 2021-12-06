import * as path from 'path';

export const MODULE_DIR = path.join('src', 'lib', 'modules', '{module!kebabCase}');
export const MODELS_DIR = 'models';
export const MODEL_FILE = '{method!kebabCase}.model.ts';
export const SERVICE_FILE = '{module!kebabCase}.service.ts';
export const ENDPOINTS_FILE = '{module!kebabCase}.endpoints.ts';
import * as path from 'path';

export const MODULE_DIR = path.join('src', 'lib', 'modules', '{module!kebabCase}');
export const MODELS_DIR = path.join(MODULE_DIR, 'models');
export const MODEL_FILE = path.join(MODULE_DIR, 'models', '{method!kebabCase}.model.ts');
export const SERVICE_FILE = path.join(MODULE_DIR, '{module!kebabCase}.service.ts');
export const ENDPOINTS_FILE = path.join(MODULE_DIR, '{module!kebabCase}.endpoints.ts');
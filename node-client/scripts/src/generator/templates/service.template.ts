const template = `
import {{ Inject, Service }} from 'typedi';

import {{ Context, DataSource }} from '../../utils';

import endpoints from './{module!kebabCase}.endpoints';

/**
 * The data source service for {module!lowerCase} module.
 */
@Service()
export class {module!pascalCase}Service extends DataSource {{
  /**
   * The client context
   */
  @Inject()
  private _context: Context;
  get context() {{ return this._context; }}
}}
`



export default template;
const template = `
/**
 * @module
 * Request and response models for {model!lowerCase}
 */
import {{ IsOptional, ValidateIf }} from "class-validator";

import {{
  DateField,
  EnumField,
  ResponseStatus,
  StringField
}} from "../../../common";

/**
 * The request model for {model!lowerCase} endpoint
 */
export class {model!pascalCase}RequestModel {{
  
}}

/**
 * The response model for {model!lowerCase} endpoint
 */
export class {model!pascalCase}ResponseModel {{
  /**
   * request success or failure status
   */
  @EnumField(ResponseStatus)
  stat: ResponseStatus;
  /**
   * It will be present only on successful request.
   */
  @DateField()
  @ValidateIf(o => o.stat === ResponseStatus.OK)
  request_time?: Date;
  /**
   * Error message if the request failed
   */
  @StringField()
  @IsOptional()
  emsg?: string;
}}
`

export default template;
export type Validator<T = unknown> =
  | ArrayValidator<T>
  | EnumValidator<T>
  | ObjectValidator<T>
  | BooleanValidator
  | DateValidator
  | NumberValidator
  | StringValidator
  | AnyValidator
interface Rule {
  field: string;
}
interface Options {
  messages: string;
}
interface Base<T> {
  required?: boolean;
  message?: string;
  trigger?: 'change' | 'blur';
  options?: { first?: boolean; suppressWarning?: boolean; firstFields?: boolean };
  transform?: (value: T) => T;
  validator?(
    rule: Rule,
    value: T,
    cb: (err?: Error | Error[]) => void,
    source: unknown,
    options: Options,
  ): boolean;
  asyncValidator?(
    rule: Rule,
    value: T,
    cb: (err?: Error | Error[]) => void,
    source: unknown,
    options: Options
  ): void;
  asyncValidator?(
    rule: Rule,
    value: T,
    cb: (err?: Error | Error[]) => void,
    source: unknown,
    options: Options
  ): Promise<void>;
}
interface AnyValidator extends Base<unknown> {
  type?: 'method' | 'regexp' | 'any';
}
interface DateValidator extends Base<Date> {
  type: 'date';
}
interface BooleanValidator extends Base<boolean> {
  type: 'boolean';
}
interface NumberValidator extends Base<number> {
  type: 'integer' | 'float';
}
interface StringValidator extends Base<string> {
  type: 'string' | 'email' | 'hex' | 'url';
  pattern?: RegExp;
}
interface ArrayValidator<T> extends Base<T[]> {
  type: 'array';
  len?: number;
  fields?: Record<number, Validator>;
  defaultField?: Validator;
}
interface ObjectValidator<T> extends Base<T> {
  type: 'object';
  fields?: Record<string, Validator>;
  defaultField?: Validator;
}

interface EnumValidator<T> extends Base<T> {
  type: 'enum';
  enum: T[];
}

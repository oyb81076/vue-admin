import { Validator } from './validator';

export interface Example {
  id: string;
  type: ExampleType;
  name: string;
  managerId: string;
  created: Date | string;
  price: number;
  quantity: number;
  disabled: boolean;
}

export enum ExampleType {
  // 公共
  PUBLIC = 'PUBLIC',
  // 私有
  PRIVATE = 'PRIVATE',
  // 下载
  PROTECTED = 'PROTECTED',
}

export const exampleTypeNames: Record<ExampleType, string> = {
  PUBLIC: '公共',
  PRIVATE: '私有',
  PROTECTED: '保护',
};

export function createRules(): Partial<Record<keyof Example, Validator[] | Validator>> {
  return {
    type: { type: 'enum', enum: Object.keys(ExampleType), required: true },
    name: { type: 'string' },
    managerId: { type: 'string', pattern: /^\d+$/ },
    created: { type: 'date' },
    price: { type: 'float' },
    quantity: { type: 'integer' },
    disabled: { type: 'boolean' },
  };
}

import { isCuid } from '@paralleldrive/cuid2';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsCuidConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    return typeof value === 'string' && isCuid(value);
  }

  defaultMessage() {
    return 'O valor fornecido ($value) não é um CUIDv2 válido.';
  }
}

export function IsCuid(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCuidConstraint,
    });
  };
}

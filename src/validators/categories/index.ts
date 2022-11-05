import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import AppDataSource from "../../data-source";
import Category from "../../entities/category.entity";
import AppError from "../../errors/appErrors";

@ValidatorConstraint({ async: true })
export class NameAlreadyExistsConstraint
  implements ValidatorConstraintInterface
{
  async validate(name: string, args: ValidationArguments) {
    const repository = AppDataSource.getRepository(Category);
    return repository.findOne({ where: { name } }).then((user) => {
      if (user) {
        return false;
      }
      return true;
    });
  }
}

export const NameAlreadyExists = (validationOptions?: ValidationOptions) => {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: NameAlreadyExistsConstraint,
    });
  };
};

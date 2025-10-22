import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator'

export function Match(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isLongerThan',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints
          const relatedValue = (args.object as any)[relatedPropertyName]
          return value === relatedValue
        },
        defaultMessage(args: ValidationArguments) {
          const [relativedPropertyName] = args.constraints
          return `${args.property} must match ${relativedPropertyName}`
        },
      },
    })
  }
}

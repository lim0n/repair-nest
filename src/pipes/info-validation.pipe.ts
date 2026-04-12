import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass, plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { ValidationException } from "src/exceptions/validation.exception";

@Injectable()
export class InfoValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata): Promise<any> {
    const obj = plainToInstance(metadata.metatype, value);
    const errors: ValidationError[]  = await validate(obj);
    if (errors.length) {
      let messages = errors.map(error => {
        return `${error.property} - ${error.constraints
          ? Object.values(error.constraints).join(', ')
          : 'Validation failed'}`
      })
      throw new ValidationException(messages)
    }
    return value;
  }
}
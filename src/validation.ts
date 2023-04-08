import { BadRequestException } from '@nestjs/common';
import * as Joi from 'joi';

export const joiValidate = (schema: Joi.Schema, object) => {
  const { value, error } = schema.validate(object);
  if (error) {
    throw new BadRequestException(
      error?.details?.[0].message,
      'Validation failed',
    );
  }
  return value;
};

export const getBlogsParamsSchema: Joi.Schema = Joi.object({
  slug: Joi.string(),
  startDate: Joi.date(),
  author: Joi.number(),
});

// here we can add more validation schema for apis

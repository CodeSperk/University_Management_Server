import { z } from 'zod';

const createDepertmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Department name must be string',
      required_error: 'Department name is required',
    }),
    faculty: z.string({
      required_error: 'Faculty is required',
    }),
  }),
});

const updateDepertmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Department name must be string',
      })
      .optional(),
    faculty: z.string().optional(),
  }),
});

export const DepartmentValidation = {
  createDepertmentValidationSchema,
  updateDepertmentValidationSchema,
};

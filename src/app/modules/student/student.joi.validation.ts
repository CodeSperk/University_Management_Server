/* eslint-disable prettier/prettier */
import Joi from 'joi';

const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .max(20)
    .trim()
    .required()
    .custom((value, helpers) => {
      const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
      if (value !== capitalized) {
        return helpers.error('any.custom', {
          message: `"${value}" is not in capitalize format`,
        });
      }
      return value;
    }),
  middleName: Joi.string().trim().allow(null, ''),
  lastName: Joi.string()
    .trim()
    .required()
    .pattern(/^[A-Za-z]+$/)
    .messages({
      'string.pattern.base': '{#value} is not valid',
    }),
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().trim().required().messages({
    'any.required': "Father's name is required",
  }),
  fatherOccupation: Joi.string().trim().required().messages({
    'any.required': "Father's occupation is required",
  }),
  fatherContactNo: Joi.string().trim().required().messages({
    'any.required': "Father's contact number is required",
  }),
  motherName: Joi.string().trim().required().messages({
    'any.required': "Mother's name is required",
  }),
  motherOccupation: Joi.string().trim().required().messages({
    'any.required': "Mother's occupation is required",
  }),
  motherContactNo: Joi.string().trim().required().messages({
    'any.required': "Mother's contact number is required",
  }),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'any.required': "Local guardian's name is required",
  }),
  occupation: Joi.string().trim().required().messages({
    'any.required': "Local guardian's occupation is required",
  }),
  contactName: Joi.string().trim().required().messages({
    'any.required': "Local guardian's contact number is required",
  }),
  address: Joi.string().trim().required().messages({
    'any.required': "Local guardian's address is required",
  }),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().trim().required().messages({
    'any.required': 'Student ID is required',
  }),
  name: userNameValidationSchema.required().messages({
    'any.required': 'Student name is required',
  }),
  gender: Joi.string().valid('male', 'female').required().messages({
    'any.only': 'The gender field can only be either "male" or "female"',
    'any.required': 'Gender is required',
  }),
  email: Joi.string().trim().email().required().messages({
    'string.email': '{#value} is not an email type',
    'any.required': 'Email is required',
  }),
  dateOfBirth: Joi.string().trim().allow(null, ''), // Optional field
  contactNo: Joi.string().trim().required().messages({
    'any.required': 'Contact number is required',
  }),
  emergencyContactNo: Joi.string().trim().required().messages({
    'any.required': 'Emergency contact number is required',
  }),
  bloodGroup: Joi.string()
    .trim()
    .valid('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-')
    .messages({
      'any.only': '{#value} is not a valid blood group.',
    }),
  presentAddress: Joi.string().trim().required().messages({
    'any.required': 'Present address is required',
  }),
  permanentAddress: Joi.string().trim().required().messages({
    'any.required': 'Permanent address is required',
  }),
  guardian: guardianValidationSchema.required().messages({
    'any.required': 'Guardian information is required',
  }),
  localGuardian: localGuardianValidationSchema.required().messages({
    'any.required': 'Local guardian information is required',
  }),
  profileImg: Joi.string().trim().allow(null, ''),
  isActive: Joi.string()
    .trim()
    .valid('active', 'blocked')
    .default('active')
    .messages({
      'any.only': 'Status must be either "active" or "blocked"',
    }),
});

export default studentValidationSchema;

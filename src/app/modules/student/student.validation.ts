import { z } from 'zod';

const createUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, 'First name must be at least 2 characters long')
    .max(50, 'First name cannot exceed 50 characters'),
  middleName: z
    .string()
    .trim()
    .max(50, 'Middle name cannot exceed 50 characters')
    .optional(),
  lastName: z
    .string()
    .trim()
    .min(2, 'Last name must be at least 2 characters long')
    .max(50, 'Last name cannot exceed 50 characters'),
});

const createGguardianValidationSchema = z.object({
  fatherName: z
    .string()
    .trim()
    .min(2, 'Father name must be at least 2 characters long'),
  fatherOccupation: z
    .string()
    .trim()
    .min(2, 'Father occupation must be at least 2 characters long'),
  fatherContactNo: z
    .string()
    .trim()
    .regex(
      /^\d{10,15}$/,
      'Father contact number must be between 10 to 15 digits',
    ),
  motherName: z
    .string()
    .trim()
    .min(2, 'Mother name must be at least 2 characters long'),
  motherOccupation: z
    .string()
    .trim()
    .min(2, 'Mother occupation must be at least 2 characters long'),
  motherContactNo: z
    .string()
    .trim()
    .regex(
      /^\d{10,15}$/,
      'Mother contact number must be between 10 to 15 digits',
    ),
});

const createLocalGuardianValidationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Local guardian's name must be at least 2 characters long"),
  occupation: z
    .string()
    .trim()
    .min(2, "Local guardian's occupation must be at least 2 characters long"),
  contactName: z
    .string()
    .trim()
    .regex(
      /^\d{10,15}$/,
      'Local guardian contact number must be between 10 to 15 digits',
    ),
  address: z
    .string()
    .trim()
    .min(5, "Local guardian's address must be at least 5 characters long"),
});

const CreateStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: createUserNameValidationSchema,
      gender: z.enum(['male', 'female'], {
        message: 'Gender must be either male or female',
      }),
      email: z.string().trim().email({ message: 'Invalid email format' }),
      dateOfBirth: z.string().optional(),
      contactNo: z
        .string()
        .trim()
        .regex(/^\d{10,15}$/, {
          message: 'Contact number must be between 10 to 15 digits',
        }),
      emergencyContactNo: z
        .string()
        .trim()
        .regex(/^\d{10,15}$/, {
          message: 'Emergency contact number must be between 10 to 15 digits',
        }),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])
        .optional(),
      presentAddress: z.string().trim().min(5, {
        message: 'Present address must be at least 5 characters long',
      }),
      permanentAddress: z.string().trim().min(5, {
        message: 'Permanent address must be at least 5 characters long',
      }),
      guardian: createGguardianValidationSchema,
      localGuardian: createLocalGuardianValidationSchema,
      profileImg: z
        .string()
        .trim()
        .url({ message: 'Invalid profile image URL' })
        .optional(),
      admissionSemester: z.string(),
      department: z.string(),
    }),
  }),
});

//to validate update
const updateUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, 'First name must be at least 2 characters long')
    .max(50, 'First name cannot exceed 50 characters')
    .optional(),
  middleName: z
    .string()
    .trim()
    .max(50, 'Middle name cannot exceed 50 characters')
    .optional(),
  lastName: z
    .string()
    .trim()
    .min(2, 'Last name must be at least 2 characters long')
    .max(50, 'Last name cannot exceed 50 characters')
    .optional(),
});

const updateGuardianValidationSchema = z.object({
  fatherName: z
    .string()
    .trim()
    .min(2, 'Father name must be at least 2 characters long')
    .optional(),
  fatherOccupation: z
    .string()
    .trim()
    .min(2, 'Father occupation must be at least 2 characters long')
    .optional(),
  fatherContactNo: z
    .string()
    .trim()
    .regex(
      /^\d{10,15}$/,
      'Father contact number must be between 10 to 15 digits',
    )
    .optional(),
  motherName: z
    .string()
    .trim()
    .min(2, 'Mother name must be at least 2 characters long')
    .optional(),
  motherOccupation: z
    .string()
    .trim()
    .min(2, 'Mother occupation must be at least 2 characters long')
    .optional(),
  motherContactNo: z
    .string()
    .trim()
    .regex(
      /^\d{10,15}$/,
      'Mother contact number must be between 10 to 15 digits',
    )
    .optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Local guardian's name must be at least 2 characters long")
    .optional(),
  occupation: z
    .string()
    .trim()
    .min(2, "Local guardian's occupation must be at least 2 characters long")
    .optional(),
  contactName: z
    .string()
    .trim()
    .regex(
      /^\d{10,15}$/,
      'Local guardian contact number must be between 10 to 15 digits',
    )
    .optional(),
  address: z
    .string()
    .trim()
    .min(5, "Local guardian's address must be at least 5 characters long")
    .optional(),
});

const UpdateStudentValidationSchema = z.object({
  body: z.object({
    student: z
      .object({
        name: updateUserNameValidationSchema.optional(),
        gender: z
          .enum(['male', 'female'], {
            message: 'Gender must be either male or female',
          })
          .optional(),
        email: z
          .string()
          .trim()
          .email({ message: 'Invalid email format' })
          .optional(),
        dateOfBirth: z.string().optional(),
        contactNo: z
          .string()
          .trim()
          .regex(/^\d{10,15}$/, {
            message: 'Contact number must be between 10 to 15 digits',
          })
          .optional(),
        emergencyContactNo: z
          .string()
          .trim()
          .regex(/^\d{10,15}$/, {
            message: 'Emergency contact number must be between 10 to 15 digits',
          })
          .optional(),
        bloodGroup: z
          .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])
          .optional(),
        presentAddress: z
          .string()
          .trim()
          .min(5, {
            message: 'Present address must be at least 5 characters long',
          })
          .optional(),
        permanentAddress: z
          .string()
          .trim()
          .min(5, {
            message: 'Permanent address must be at least 5 characters long',
          })
          .optional(),
        guardian: updateGuardianValidationSchema.optional(),
        localGuardian: updateLocalGuardianValidationSchema.optional(),
        profileImg: z
          .string()
          .trim()
          .url({ message: 'Invalid profile image URL' })
          .optional(),
        admissionSemester: z.string().optional(),
        department: z.string().optional(),
      })
      .optional(),
  }),
});

export const studentValidations = {
  CreateStudentValidationSchema,
  UpdateStudentValidationSchema,
};

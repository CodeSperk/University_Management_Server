import { model, Schema } from 'mongoose';
import { TAcademicSemester } from './as.interface';
import {
  AcademicSemesterCode,
  AcademicSemesterNames,
  Months,
} from './as.constants';

const SemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: AcademicSemesterNames,
      required: true,
    },
    year: { type: Date, required: true },
    code: {
      type: String,
      enum: AcademicSemesterCode,
    },
    startMonth: {
      type: String,
      enum: Months,
    },
    endMonth: {
      type: String,
      enum: Months,
    },
  },
  { timestamps: true },
);

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  SemesterSchema,
);

import { model, Schema, next } from 'mongoose';
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
    year: { type: String, required: true },
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

//To prevent same kind of multiple semester creating in the same year
SemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  });
  if (isSemesterExists) {
    throw new Error('Semister is already exists !');
  }
  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  SemesterSchema,
);

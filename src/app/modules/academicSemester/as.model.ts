import { model, Schema } from 'mongoose';
import { TAcademicSemester } from './as.interface';

const SemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: ['Autumn', 'Summar', 'Fall'],
    },
    code: {
      type: String,
      enum: ['01', '02', '03'],
    },
    year: { type: Date },
    startMonth: {
      type: String,
      enum: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
    },
    endMonth: {
      type: String,
      enum: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
    },
  },
  { timestamps: true },
);

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  SemesterSchema,
);

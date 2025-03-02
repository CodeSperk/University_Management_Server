import { model, Schema } from 'mongoose';
import { TAcademicSemester, TMonth } from './as.interface';
const MonthsEnum: TMonth[] = [
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
];

const SemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: ['Autumn', 'Summar', 'Fall'],
      required: true,
    },
    year: { type: Date, required: true },
    code: {
      type: String,
      enum: ['01', '02', '03'],
    },
    startMonth: {
      type: String,
      enum: MonthsEnum,
    },
    endMonth: {
      type: String,
      enum: MonthsEnum,
    },
  },
  { timestamps: true },
);

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  SemesterSchema,
);

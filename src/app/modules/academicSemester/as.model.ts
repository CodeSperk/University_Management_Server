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
    year: { type: String, required: true },
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

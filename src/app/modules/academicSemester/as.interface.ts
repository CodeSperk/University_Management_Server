export type TMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

<<<<<<< HEAD
export type TAcademicSemesterNames = 'Autumn' | 'Summer' | 'Fall';
export type TAcademicSemesterCode = '01' | '02' | '03';

export type TAcademicSemester = {
  name: TAcademicSemesterNames;
  year: string;
  code: TAcademicSemesterCode;
=======
export type TAcademicSemester = {
  name: 'Autumn' | 'Summar' | 'Fall';
  year: Date;
  code: '01' | '02' | '03';
>>>>>>> parent of acea1a7 (created constants & validation)
  name: 'Autumn' | 'Summar' | 'Fall';
  year: Date;
  code: '01' | '02' | '03';
  startMonth: TMonth;
  endMonth: TMonth;
};

export type TAcademicSemesterNameCodeMapper = {
  [key: string]: string;
};

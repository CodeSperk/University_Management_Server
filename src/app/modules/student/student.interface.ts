import { Model } from 'mongoose';

export type IUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type IGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type ILocalGuardian = {
  name: string;
  occupation: string;
  contactName: string;
  address: string;
};

export type IStudent = {
  id: string;
  name: IUserName;
  gender: 'male' | 'female';
  email: string;
  dateOfBirth?: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
  presentAddress: string;
  permanentAddress: string;
  guardian: IGuardian;
  localGuardian: ILocalGuardian;
  profileImg?: string;
  isActive: 'active' | 'blocked';
};

export type IStudentMethods = {
  isUserExists(id: string): Promise<IStudent | null>;
};

// Create a new Model type that knows about StudentMethods...
export type IStudentModel = Model<
  IStudent,
  Record<string, never>,
  IStudentMethods
>;

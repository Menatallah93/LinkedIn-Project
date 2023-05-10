import { IUser } from '../Shared-Interface/IUser';
export interface IProfile {
  userId: string,
  fullName: string,
  fName: string,
  lName: string,
  about: string,
  company: string,
  job: string,
  cuntry: string,
  address: string,
  phone: string,
  twitterLink: string,
  facebookLink: string,
  instagramLink: string,
  linkedinLink: string,
  image?: string
}
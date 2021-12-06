export interface IGUser {
  uid: string
  email: string
  password: string
  emailVerified: boolean
  returnSecureToken?: boolean;
}

export interface IUser {
  email: string
  password: string
}

export interface ITCN {
  name: string
  tarif: number
  index?: number
}

export interface FbAuthResponse {
  expiresIn: string;
  idToken: string
}



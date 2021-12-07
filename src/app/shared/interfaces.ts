export interface UGser {
  email: string
  password: string
  returnSecureToken?: boolean;
}

export interface IUser {
  password? : string
  displayName: string;
  email: string;
  photoURL: string;
  emailVerified: boolean;
  uid: string;
}

export interface I2User {
  password : string
  email: string;
}


export interface FbAuthResponse {
  expiresIn: string;
  idToken: string
}



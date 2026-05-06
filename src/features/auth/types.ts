export interface SignUpForm {
   email: string;
   password: string;
   name: string;
   lastName: string;
   birthday?: Date;
   role: 'Ministro Extraordinario' | 'Monaguillo';
   parishId: string;
}

export interface SignInForm {
   email: string;
   password: string;
}
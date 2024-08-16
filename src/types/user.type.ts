type UserVerifyStatus = 'Unverified' | 'Verified' | 'Banned'
export interface User {
  email: string
  name: string | null
  password: string | null
  dateOfBirth: string | null
  createdAt: Date | null
  updatedAt: Date | null
  emailVerifiedToken: string | null
  forgotPasswordToken: string | null
  avatar: string | null
  verify: UserVerifyStatus
  decentralizations: Decentralization[]
}

export interface Decentralization {
  id: string
  emailAuthor: string
  roleName: string
}

import { create } from "zustand";

type userLoginStore = {
    role: 'ADMIN'|'USER',
    email:string,
    name:string,
    password:string,
    isRegistered:boolean
    isSignedIn:boolean
    numberOfUsers?:number
}
type userLoginActions={
    updateUserState: (user: Partial<userLoginStore>) => void;
}

const userLogState: userLoginStore = {
    role: 'USER',
    email: '',
    name: '',
    password: '',
    isRegistered: false,
    isSignedIn: false,
    numberOfUsers: 0
}

export const useUserLoginStore = create<userLoginStore & userLoginActions>()((set) => ({
    ...userLogState,
    updateUserState: (data) => set((state) => ({ ...state, ...data })),
}))


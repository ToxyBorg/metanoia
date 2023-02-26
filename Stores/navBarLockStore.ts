import { atom } from "jotai";


/**             NAVBAR LOCK BUTTON TYPE */
// type navLockType = "LOCKED" | "UNLOCKED"


/**             NAVBAR LOCK BUTTON STATE */
export const navBarLockedAtom = atom<boolean>(false)
// const navLockAtom = atom<navLockType, [], navLockType | void>(
//     (get) => get(navLockInitAtom),
//     (_get, set) => {


//     }
// )

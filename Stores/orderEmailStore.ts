import { atom } from "jotai";
import { Database } from "../services/supabase/lib/database.types";
import * as Yup from 'yup';
import { z } from 'zod'
import { atomWithValidate } from "jotai-form";

/**             ORDER ITEMS TYPE */
type OrderData = Database['public']["Tables"]['orders']['Row'][]

// defining a validation schema for the atom
export const emailSchema = Yup.string().email();
// export const emailSchema = z.string().email()

// creating the atom with an async validation function

// export const emailAtom = atomWithValidate('', {
//     validate: async (v) => {
//         await emailSchema.parseAsync(v);
//         return v;
//     },

// });

export const emailAtom = atomWithValidate('', {
    validate: (v) => {
        emailSchema.validateSync(v);
        return v;
    },
});

// export const orderConfirmed = atom<boolean>(false)
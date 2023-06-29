import * as z from 'zod';

export const personalInformationSchema = z.object({
    firstName: z.string().min(2, { message: "Meno musí obsahovať aspoň 2 znaky" }).max(20, { message: "Meno nesmie obsahovať viac ako 20 znakov" }),
    lastName: z.string().min(2, { message: "Priezvisko musí obsahovať aspoň 2 znaky" }).max(30, { message: "Priezvisko nesmie obsahovať viac ako 30 znakov" }),
    email: z.string().email({ message: "E-mail má nesprávny formát" }),
    prefix: z.string(),
    phone: z.string().length(9, { message: "Číslo má nesprávny formát (905123456)" }).regex(/^\d+$/, { message: "Číslo musí obsahovať iba číslice" })
})
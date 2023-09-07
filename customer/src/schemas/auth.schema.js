import { z } from 'zod'

//TODO: In password, validate numbers, letters and characters
export const registerSchema = z.object({
    username: z.string({
        required_error: 'Nombre de usuario requerido'
    }),
    email: z.string({
        required_error: 'Email es requrido'
    }).email({
        message: 'Email invalido'
    }),
    password: z.string({
        required_error: 'Contraseña es requerida',
    }).min(6, {
        message: 'La contraseña debe tener al menos 6 caracteres'
    }),
})

//TODO: In password, validate numbers, letters and characters
export const loginSchema = z.object({
    email: z.string({
        required_error: 'Email es requerido',
    }).email({
        message: 'Email invalido',
    }),
    password: z.string({
        required_error: 'Contraseña requerida',
    }).min(6, {
        message: 'La contraseña debe tener al menos 6 caracteres'
    }),
})
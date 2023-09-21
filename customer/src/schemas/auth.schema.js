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
    }).refine((password) => {
        // Utiliza una expresión regular para verificar si hay al menos una mayúscula y un carácter especial
        return /[A-Z]/.test(password) && /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]+/.test(password)
    }, {
        message: 'La contraseña debe contener al menos una mayúscula y un carácter especial'
    }
    ),
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
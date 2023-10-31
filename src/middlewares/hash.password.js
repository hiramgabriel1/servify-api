import argon2 from "argon2"

export const encryptPassword = async(password) => {
    try {
        const hashed = await argon2.hash(password)
        
        return hashed
    } catch (error) {
        console.error(error)
    }
}

export const verifyPassword = async(hashedPassword, password) => {
    try {
        const validatePasswordHashed = await argon2.verify(hashedPassword, password)
        
        return validatePasswordHashed
    } catch (error) {
        console.error(error)
    }
}
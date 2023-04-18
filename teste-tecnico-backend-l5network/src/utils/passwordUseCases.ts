import bcrypt from "bcrypt";

export async function generatePasswordHash(password: string) {
    const salt = parseInt(process.env.SALT)
    return await bcrypt.hash(password,salt);
}

export function comparePassword(password: string, hashedPassword:string) {

    const isPasswordMatch = bcrypt.compareSync(password, hashedPassword);

    return isPasswordMatch; 

}
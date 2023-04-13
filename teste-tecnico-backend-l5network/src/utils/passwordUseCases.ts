import bcrypt from "bcrypt";

export async function generatePasswordHash(password: string) {
  console.log(process.env.SALT)
  const salt = 12
    return await bcrypt.hash(password,salt);
}

export function comparePassword(password: string, hashedPassword:string) {

    const isPasswordMatch = bcrypt.compareSync(password, hashedPassword);

    return isPasswordMatch; 

}
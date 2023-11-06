import bcrypt from "bcrypt";

export const encryptPassword = async (password) => {
  const salt = 10;
  const hashPassword = await bcrypt.hash(password, salt);

  return hashPassword;
};

export const comparePassword = async (password, hashPassword) => {
  
    return await bcrypt.compare(password, hashPassword);
};
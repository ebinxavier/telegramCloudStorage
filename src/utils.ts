export const delay = async (ms: number) => {
  return new Promise((res) => {
    setTimeout(() => {
      res("");
    }, ms);
  });
};

export const getSecret = (secretName: string) => {
  const secret = process.env[secretName];
  if (!secret) {
    console.log(`Secret ${secretName} is not defined in env`);
    throw new Error("Server error while reading secret!");
  }
  return secret;
};

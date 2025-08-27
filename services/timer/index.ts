export const sleep = async (ms: number): Promise<NodeJS.Timeout> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function sleep(t = 0): Promise<void> {
  await new Promise((r) => setTimeout(r, t));
}

export function randomError(error = 'mock error') {
  if (Math.random() < 0.5) {
    throw new Error(error);
  }
}

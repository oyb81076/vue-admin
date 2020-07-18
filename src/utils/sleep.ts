export default async function sleep(t = 0): Promise<void> {
  await new Promise((r) => setTimeout(r, t));
}

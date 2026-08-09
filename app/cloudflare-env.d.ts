declare module "cloudflare:workers" {
  const env: Record<string, string | undefined> & Record<string, unknown>;
  export { env };
}

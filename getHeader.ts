import signKey from "./signKey.ts";
export default async function getHeader(
  cookie: string,
  secret: string,
  word: string
): Promise<string> {
  return `Cookie: session=${await signKey(
    cookie.replace("changeMe", word),
    secret
  )}`.replaceAll("\n", "");
}

export default async function signKey(
  cookie: string,
  secret: string
): Promise<string> {
  const cmd = [
    "flask-unsign",
    "--sign",
    "--cookie",
    cookie,
    "--secret",
    secret,
  ];

  const p = Deno.run({
    cmd,
    stdout: "piped",
    stderr: "piped",
  });

  const { code } = await p.status();

  const rawOutput = await p.output();

  const rawError = await p.stderrOutput();

  if (code === 0) {
    return new TextDecoder().decode(rawOutput);
  } else {
    const errorString = new TextDecoder().decode(rawError);
    console.log(errorString);
    Deno.exit(code);
  }
}

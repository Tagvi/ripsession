import { Flags } from "./types.ts";
export default function getFlags(args: string[]): Flags {
  const flags: Flags = {
    string: {},
    boolean: {},
  };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (isFlag(arg)) {
      const flagValue = getFlagValue(args, i);
      if (typeof flagValue === "boolean") {
        flags.boolean[getFlagName(arg)] = flagValue;
      }
      flags.string[getFlagName(arg)] = flagValue;
    }
  }
  return flags;
}

function isFlag(arg: string): boolean {
  return arg.startsWith("-") || arg.startsWith("--");
}

function getFlagName(flag: string): string {
  if (flag.startsWith("--")) {
    return flag.substring(2, flag.length);
  }
  if (flag.startsWith("-")) {
    return flag.substring(1, flag.length);
  }
  throw new Error("Not a valid flag!");
}

function getFlagValue(args: string[], index: number): string | true {
  const nextArg = args[index + 1];
  if (!nextArg || isFlag(nextArg)) {
    return true;
  }
  return nextArg;
}

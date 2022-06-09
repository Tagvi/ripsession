import { assertObjectMatch } from "https://deno.land/std@0.142.0/testing/asserts.ts";
import getFlags from "../getFlags.ts";

Deno.test("Check if flags are retrieved properly", () => {
  for (const { test, shouldEqual } of testCases) {
    assertObjectMatch(getFlags(test), shouldEqual);
  }
});

const testCases: {
  test: string[];
  shouldEqual: Record<string, unknown>;
}[] = [
  {
    test: [
      "-u",
      "someurl",
      "-c",
      "somecookie",
      "-s",
      "somesecret",
      "-f",
      "somefailurestring",
    ],
    shouldEqual: {
      u: "someurl",
      c: "somecookie",
      s: "somesecret",
      f: "somefailurestring",
    },
  },
  {
    test: [
      "-u",
      "someurl",
      "-c",
      "somecookie",
      "-s",
      "somesecret",
      "--multi",
      "-f",
      "somefailurestring",
    ],
    shouldEqual: {
      u: "someurl",
      c: "somecookie",
      s: "somesecret",
      multi: true,
      f: "somefailurestring",
    },
  },
  {
    test: [
      "-u",
      "someurl",
      "-c",
      "somecookie",
      "-s",
      "somesecret",
      "-f",
      "somefailurestring",
      "--multi",
    ],
    shouldEqual: {
      u: "someurl",
      c: "somecookie",
      s: "somesecret",
      f: "somefailurestring",
      multi: true,
    },
  },
];

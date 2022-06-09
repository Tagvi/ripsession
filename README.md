# RIPsession

## About the program

RIPsession is written in TypeScript and is meant to be used with the [Deno runtime](https://deno.land/manual).

The program takes a JSON object which is meant to be used with Flask Session Cookies and modifies its values with a wordlists and using brute-force detects if the value is valid.

For example, if you have following JSON object

```json
{'logged_in': True, 'username': 'changeMe'}
```

The program will detect changeMe and replace it with values inside a given wordlist.

Once a correct username pops up, it will exit the program.

You can also pass the --multi flag to run through the whole wordlist.

## Usage

### Dependencies

[curl](https://curl.se/), [Deno](https://deno.land/manual) and [flask-unsign](https://github.com/Paradoxis/Flask-Unsign)

```bash
deno run --allow-run --allow-read index.ts -u <url> -c <cookie> -s <secret> -f <failure idicator> -w <wordlist>
```

URL: a regular URL that you can use with curl.

Cookie: a JSON object. Strings that contain "changeMe" will automatically be replaced every iteration.

Secret: A secret password to sign your cookie.

Failure indicator: since most of the time the server won't return a 400+ status code but rather have some output indicating that the cookie value is wrong, you can pass a string here and if the response includes the following string then it will count as failed.

Wordlist: A text file containing values. Each value has to start on a new line. The program will start from the top and use every value inside the "changeMe" slot.

### Optional flag(s)

You can also pass --multi so that it does not stop when it finds the first correct value.

### Compilation

You can also optionally compile the code to make a self-contained executable

```bash
deno compile --allow-read --allow-run index.ts
```

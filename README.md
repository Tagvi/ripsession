# RIPsession
## Description of the tool 
RIPsession takes words from a wordlist,
one-by-one it inserts a word into a JSON object, then turns it 
into a cookie by signing with flask_unsign. 
Afterwards, it hits the target server with the cookie
and checks if it returns a 200-299 status code,
it also validates the response by checking if 
the response contains the failure indicator string.

## Requirements
Cargo, [flask_unsign](https://github.com/Paradoxis/Flask-Unsign/)

## Installing
```sh
  git clone https://github.com/Tagvi/ripsession.git && cd ripsession
  cargo install --path .
```

## Usage
```console
  Usage: ripsession [OPTIONS] --url <URL> --cookie <COOKIE> --secret <SECRET> --failure-indicator <FAILURE_INDICATOR> --wordlist <WORDLIST>
  ```
Cookie format: `{"key": "changeMe"}`, the program will automatically replace every mention of `changeMe` with a word from the wordlist.
You can run --help for more information and other flags

## Want to contribute? Here are some things that can be improved
- [ ] Implement `flask-unsign` signing function in rust
- [ ] Make a library out of the code and call it from the main function

(Both are extremely easy to do, I just don't have enough time myself)

## Example
You can also check out the example directory for a concrete example

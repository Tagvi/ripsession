# Example to demonstrate the tool
## Setup
### Create and activate virtual env
```shell
  python -m venv myenv
  source myenv/bin/activate
```
### Install dependencies
```shell
  pip install -r requirements.txt
```
### Run the server
```shell
  flask run
```
### Run ripsession 
```shell
  ripsession \
  --url http://localhost:5000 \
  --cookie '{"username": "changeMe"}' \
  --wordlist wordlist.txt \
  --failure-indicator "Denied" \
  --secret secret123 \
  --multi
```

### Exit the virtual env
```shell
  deactivate
```


# Text-Justify
Text-justify is a API that justifies a text passed as a parameter.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`APP_PORT`

`JWT_SECRET`


## Run Locally

Clone the project

```bash
  git clone git@github.com:j-hazart/text-justify.git
```

Go to the project directory

```bash
  cd text-justify
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## API Reference

### POST email

```cURL
  POST /api/token
```
*Send an email to get a token to use text justification.*

__body(json):__
```json
  {
    "email":"foo@bar.com"
  }
```

### POST text

```cURL
  POST /api/justify
```
*Send a text to justify it with maximum 80 caracters per line. Usage limited to 80 000 words per day and user.*

__body(text):__
```text
  Lorem ipsum dolor sit amet, consectetur adipiscing elit...
```
## Authors

- [@j-hazart](https://www.github.com/j-hazart)


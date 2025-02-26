# Expense Report Application Client

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

> ![WARNING]
> We use Vercel BLOB for image/file storage, so it's not possible to fetch files from the client while hosting the app locally (localhost); you have to use a gateway API like ngrok or the client might possibly break trying to fetch files from Vercel.

### Getting started with nrgok (Gateway API)

In this case, we will use ngrok to be able to use Vercel BLOB SDK but you can use any other solution that runs the client in *https*.

1. Install ngrok via the followin bash command:
   ```bash
      curl -sSL https://ngrok-agent.s3.amazonaws.com/ngrok.asc \
    	| sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null \
    	&& echo "deb https://ngrok-agent.s3.amazonaws.com buster main" \
    	| sudo tee /etc/apt/sources.list.d/ngrok.list \
    	&& sudo apt update \
    	&& sudo apt install ngrok
   ```

2. Add your authentication token with this command:

   ```bash
      ngrok config add-authtoken <authtoken>
   ```

3. Deploy the client online, type in your console:
   ```bash
      ngrok http http://localhost:3000
   ```

4. The console will show you a link you can follow to use the client.

# Project 8: L'Oréal Chatbot

L’Oréal is exploring the power of AI, and your job is to showcase what's possible. Your task is to build a chatbot that helps users discover and understand L’Oréal’s extensive range of products—makeup, skincare, haircare, and fragrances—as well as provide personalized routines and recommendations.

## 🚀 Launch via GitHub Codespaces

1. In the GitHub repo, click the **Code** button and select **Open with Codespaces → New codespace**.
2. Once your codespace is ready, open the `index.html` file via the live preview.

## ☁️ Cloudflare Note

### Create and deploy the Worker

1. In the Cloudflare dashboard, create a Worker for this project.
2. Copy the code from [RESOURCE_cloudflare-worker.js](./RESOURCE_cloudflare-worker.js) into the Worker editor.
3. In the Worker’s **Settings → Variables and Secrets**, add your OpenAI key as a secret named `OPENAI_API_KEY`.
4. Deploy the Worker and copy its `workers.dev` URL.
5. In `script.js`, replace the sample `workerUrl` with that deployed URL.

The page sends a `messages` array to the Worker, which calls OpenAI and returns the reply in `data.choices[0].message.content`. Never put the API key in frontend files or commit it to the repository.

Enjoy building your L’Oréal beauty assistant! 💄

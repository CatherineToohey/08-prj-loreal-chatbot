// Replace this sample address with the URL of your class-hosted Worker.
const workerUrl = "https://loreal-chatbot.your-subdomain.workers.dev/";

const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const chatWindow = document.getElementById("chatWindow");

// Keep the assistant focused on L’Oréal beauty products and advice.
const systemPrompt = `You are a helpful L’Oréal beauty assistant. Only answer beauty-related questions, including questions about L’Oréal products, skincare, haircare, makeup, fragrance, routines, techniques, and recommendations. If a question is unrelated to beauty, politely say you can help only with beauty-related topics and invite the user to ask about products or routines. Use the conversation history to remember the user's name, preferences, and earlier questions, and refer to them naturally when useful. Do not ask again for details the user has already shared or assume personal details they have not provided. Do not invent product details or make medical claims; when you are unsure, say so and recommend checking official product information or consulting a qualified professional for medical concerns.`;

// Include the system prompt and conversation history with each request.
const messages = [{ role: "system", content: systemPrompt }];

// Add messages as text so user input is displayed safely.
function showMessage(role, text) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("msg", role);
  messageElement.textContent = text;
  chatWindow.appendChild(messageElement);
  chatWindow.scrollTop = chatWindow.scrollHeight;
  return messageElement;
}

showMessage("ai", "Hello! I can help you explore L’Oréal products and beauty routines.");

// Send each user message to the class-hosted Worker, which calls OpenAI securely.
chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const userMessage = userInput.value.trim();
  if (!userMessage) {
    return;
  }

  messages.push({ role: "user", content: userMessage });
  chatWindow.textContent = "";
  showMessage("user", userMessage);
  const responseBubble = showMessage("ai", "Thinking…");
  userInput.value = "";
  userInput.disabled = true;
  sendBtn.disabled = true;

  try {
    const response = await fetch(workerUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error(`The chatbot request failed (${response.status}).`);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;
    if (typeof reply !== "string" || !reply.trim()) {
      throw new Error("The chatbot returned an empty or invalid response.");
    }

    messages.push({ role: "assistant", content: reply });
    responseBubble.textContent = reply;
    chatWindow.scrollTop = chatWindow.scrollHeight;
  } catch (error) {
    // Remove the unanswered message so the conversation stays in sync.
    messages.pop();
    console.error("Could not get a chatbot response:", error);
    responseBubble.classList.remove("ai");
    responseBubble.classList.add("error");
    responseBubble.textContent = "Sorry, I couldn’t get a response. Please try again.";
  } finally {
    userInput.disabled = false;
    sendBtn.disabled = false;
    userInput.focus();
  }
});

"""Gemini API client for generating responses."""

import google.generativeai as genai
from app.config import settings

SYSTEM_PROMPT = """You are FinanceHub AI, a friendly and knowledgeable financial educator specializing in the Indian stock market. Your role is to help absolute beginners understand finance concepts clearly.

Guidelines:
- Use simple, jargon-free language. When you must use a technical term, always explain it.
- Use ₹ (Indian Rupees) for all currency references.
- Give examples relevant to Indian investors — reference NSE, BSE, SEBI, Indian brokers (Zerodha, Groww), Indian tax rules, and Indian financial products.
- Keep answers clear, well-structured, and concise. Use bullet points and numbered lists for readability.
- Format your response with markdown: use **bold** for key terms, bullet lists for multiple points, and numbered lists for steps.
- If the user's question is outside the provided context, answer based on your general knowledge but mention that the information may not be from the curated knowledge base.
- Always end your response with a brief disclaimer: "⚠️ *Disclaimer: This is for educational purposes only and not financial advice. Please consult a SEBI-registered financial advisor before making investment decisions.*"
- Be encouraging and supportive — remember, the user is a beginner learning about finance.
- If the user greets you or asks who you are, introduce yourself as FinanceHub AI and briefly explain what you can help with.

Use the following context from our knowledge base to answer the user's question accurately:

{context}
"""


class LLMClient:
    """Client for generating responses using Google's Gemini API."""

    def __init__(self):
        self.model = None

    def initialize(self):
        """Configure the Gemini API and initialize the model."""
        if not settings.GEMINI_API_KEY:
            print("WARNING: GEMINI_API_KEY not set. LLM responses will not work.")
            return

        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.model = genai.GenerativeModel("gemini-2.5-flash")
        print("Gemini API client initialized.")

    async def generate_response(
        self,
        query: str,
        context_chunks: list[dict],
        chat_history: list[dict] = None,
    ) -> str:
        """Generate a response using Gemini API with RAG context.

        Args:
            query: The user's question.
            context_chunks: Retrieved knowledge base chunks with text and metadata.
            chat_history: Previous conversation messages [{role, content}].

        Returns:
            The generated response string.
        """
        if self.model is None:
            return (
                "I'm sorry, the AI service is not configured yet. "
                "Please set up your Gemini API key in the backend `.env` file. "
                "You can get a free API key from https://aistudio.google.com/apikey"
            )

        # Build context from retrieved chunks
        context_parts = []
        for i, chunk in enumerate(context_chunks, 1):
            source = chunk.get("metadata", {}).get("source", "Unknown")
            context_parts.append(f"[Source: {source}]\n{chunk['text']}")
        context = "\n\n---\n\n".join(context_parts) if context_parts else "No specific context found."

        # Build the system prompt with context
        system_with_context = SYSTEM_PROMPT.format(context=context)

        # Create a model instance with the dynamic system instruction
        # (system_instruction must be passed at model creation, not generate_content)
        model = genai.GenerativeModel(
            "gemini-2.5-flash",
            system_instruction=system_with_context,
        )

        # Build conversation history for the API
        contents = []

        # Add chat history (last 6 messages for context window management)
        if chat_history:
            for msg in chat_history[-6:]:
                role = "user" if msg.get("role") == "user" else "model"
                contents.append({"role": role, "parts": [msg["content"]]})

        # Add the current user query
        contents.append({"role": "user", "parts": [query]})

        try:
            response = model.generate_content(
                contents=contents,
                generation_config=genai.GenerationConfig(
                    temperature=0.7,
                    max_output_tokens=2048,
                    top_p=0.9,
                ),
            )
            return response.text
        except Exception as e:
            error_msg = str(e)
            if "API_KEY" in error_msg.upper() or "PERMISSION" in error_msg.upper():
                return (
                    "There seems to be an issue with the API key. "
                    "Please check that your Gemini API key is valid and has the correct permissions."
                )
            print(f"Gemini API error: {e}")
            return (
                "I encountered an error while generating a response. "
                "Please try again in a moment. If the issue persists, "
                "check the backend logs for details."
            )


# Global singleton instance
llm_client = LLMClient()

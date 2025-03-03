import openai
import os
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

def get_gpt_response(user_input):
    try:
        client = openai.OpenAI()
        response = client.chat.completions.create(
            model="gpt-4o",  # Use "gpt-4o" instead of "gpt-4"
            messages=[{"role": "user", "content": user_input}]
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"Error: {str(e)}"

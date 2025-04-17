import google.generativeai as genai

genai.configure(api_key="AIzaSyBZeNyePgj9rHGotMNyWi58vT0A3E1W7Pw")

model = genai.GenerativeModel("gemini-1.5-pro-latest")  # Use this model
response = model.generate_content("Hello, who are you?")
print(response.text)

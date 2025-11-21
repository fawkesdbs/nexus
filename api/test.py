from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv() 
client = OpenAI(api_key = os.getenv("OPENAI_API_KEY"))

response = client.responses.create(
    model="gpt-5.1",
    input="Give me a brief summary of The Great Gatsby by F. Scott Fitzgerald.",
)

print(response.output_text)
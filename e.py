import requests
import base64

# Define the API endpoint
url = "http://localhost:3000/api/auth/register"

# Define the email and password (encode them in Base64)
email = "email@example.com"
password = "password"

# Encode email and password in Base64
encoded_email = base64.b64encode(email.encode("utf-8")).decode("utf-8")
encoded_password = base64.b64encode(password.encode("utf-8")).decode("utf-8")

# Define the request payload
payload = {
    "email": encoded_email,
    "password": encoded_password
}

# Define headers
headers = {
    "Content-Type": "application/json"
}

# Send the POST request
try:
    response = requests.post(url, json=payload, headers=headers)
    
    # Print the response
    print("Status Code:", response.status_code)
    print("Response Body:", response.json())
except requests.exceptions.RequestException as e:
    print("Request failed:", e)
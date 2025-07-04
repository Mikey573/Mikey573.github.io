
# 1. Choose a base image with Python installed
FROM python:3.11-slim

# 2. Set working directory inside container
WORKDIR /app

# 3. Copy dependency file and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 4. Copy your app’s source code
COPY . .

# 5. Expose port if your app listens (e.g., Flask)
EXPOSE 5000

# 6. Define how to run your app
CMD ["python", "app.py"]

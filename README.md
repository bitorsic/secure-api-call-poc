
# Encrypted Communication POC

This project demonstrates encrypted communication between a frontend (Next.js) and a backend (Express.js) using AES-256-CBC encryption. Data entered in the frontend is encrypted before being sent to the backend, where it is decrypted for secure handling.

## Features
- **Frontend**: A simple form implemented in Next.js for user data input.
- **Backend**: An Express.js server to handle encrypted POST requests and decrypt incoming data.
- **Encryption**: AES-256-CBC encryption ensures secure data transmission.
- **Privacy**: Prevents users from viewing sensitive data in API requests using developer tools.

---

## Prerequisites
- **Node.js**: v14 or higher
- **npm** or **yarn**: Installed globally
- **Environment Variables**: Set up as described below

---

## Setup

### Clone the Repository
```bash
git clone <repository-url>
cd <repository-directory>
```

### Set Up Environment Variables

#### **Backend (`.env`)**
Create a `.env` file in the `backend` directory with the following content:
```env
ENCRYPTION_KEY=your-base64-encoded-key
```

#### **Frontend (`.env.local`)**
Create a `.env.local` file in the `frontend` directory with the following content:
```env
NEXT_PUBLIC_ENCRYPTION_KEY=your-base64-encoded-key
```

**Note**: Use a securely generated key. You can generate one using:
```bash
openssl rand -base64 32
```

---

## Run the Project

### 1. Backend
Navigate to the `backend` folder and install dependencies:
```bash
cd backend
npm install
```

Start the server:
```bash
node index.js
```

The backend server will run on `http://localhost:8080` by default.

---

### 2. Frontend
Navigate to the `frontend` folder and install dependencies:
```bash
cd frontend
npm install
```

Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000` by default.

---

## Usage

1. Open the frontend in your browser: [http://localhost:3000](http://localhost:3000).
2. Fill out the form with `First Name`, `Last Name`, `Email`, and `Password`.
3. Click the **Submit** button.
4. The form data will be:
   - Encrypted using AES-256-CBC in the frontend.
   - Sent to the backend via an HTTP POST request.
   - Decrypted on the backend and logged to the console.

By encrypting the request body, this approach ensures that users cannot easily peek into the API requests or inspect sensitive data through developer tools in their browser.

---

## File Structure

### Backend
- **`index.js`**: Handles decryption of incoming data and logs it to the console.

### Frontend
- **`app/page.tsx`**: 
  - Renders the form.
  - Encrypts user data using AES-256-CBC.
  - Sends encrypted data to the backend.

---

## Key Points
- **Encryption Key**: The same key must be used on both frontend and backend. Keep it secure and do not expose it in public repositories.
- **Encryption Algorithm**: AES-256-CBC provides a balance of security and performance.
- **Environment Variables**: Use `.env` files for secure configuration management.
- **Privacy Guarantee**: Prevents users from inspecting sensitive data in transit using browser developer tools.

---

## Security Considerations
- **Production Use**: For real-world applications, avoid exposing encryption keys on the frontend and consider end-to-end encryption solutions.

---

## License
This project is for educational purposes and is not intended for production use without significant modifications.

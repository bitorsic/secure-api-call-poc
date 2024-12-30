"use client"
import { useState } from "react";
import crypto from "crypto";
import axios from "axios";

interface Data {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
}


export default function Home() {
  const [data, setData] = useState<Data>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  
  const secretKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
  
  if (!secretKey) {
    throw new Error('Encryption key not found in environment variables');
  }

  const encrypt = (plainText: string) => {
    const iv = crypto.randomBytes(16); // Generate a random IV
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey, 'base64'), iv);
    let encrypted = cipher.update(plainText, 'utf-8', 'base64');
    encrypted += cipher.final('base64');
    return `${iv.toString('base64')}:${encrypted}`;
  };

  const clickHandler = async () => {
    try {
      console.log(`Raw data: ${JSON.stringify(data)}`);
      const cipherText = encrypt(JSON.stringify(data));
      console.log(`Encrypted data being sent: ${cipherText}`);
  
      const url = 'http://localhost:8080';
  
      // Send the encrypted data using Axios
      const response = await axios.post(url, {
        data: cipherText, // Encrypted data goes here
      });
  
      // Handle the response
      console.log('Response:', response.data);
    } catch (error) {
      // Handle any errors
      console.error('Error sending data:', error);
    }
  };
  
  return (
    <div>
      <input
        type="text"
        placeholder="First Name"
        value={data.firstName}
        onChange={(e) => setData({ ...data, firstName: e.target.value })}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={data.lastName}
        onChange={(e) => setData({ ...data, lastName: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={data.password}
        onChange={(e) => setData({ ...data, password: e.target.value })}
      />
      <button onClick={clickHandler}>Submit</button>
    </div>
  );
}

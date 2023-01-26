// create register form using tailwind
import React,{useState} from "react";

export default function Register ({}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center w-1/3 p-8 space-y-4 bg-white rounded shadow"
      >
        <h1 className="text-2xl font-bold text-gray-700">Register</h1>
        <div className="flex flex-col w-full space-y-2">
          <label htmlFor="email" className="text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>
        <div className="flex flex-col w-full space-y-2">
          <label htmlFor="password" className="text-gray-700">
            Password
          </label>
          <input

            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>
        <button

          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

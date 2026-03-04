import { useState } from "react"
import { registerUser } from "../api/api"

function Register({ onSwitchToLogin }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  async function handleRegister() {
    setError("")
    setSuccess("")

    if (!username.trim() || !password.trim()) {
      setError("Username and password required")
      return
    }

    try {
      await registerUser(username, password)
      setSuccess("User created successfully. You can now login.")
      setUsername("")
      setPassword("")
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="bg-slate-800 p-10 rounded-2xl shadow-2xl w-full max-w-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

      <div className="flex flex-col gap-4">
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 rounded bg-slate-700"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded bg-slate-700"
        />

        {error && <p className="text-red-400 text-sm">{error}</p>}
        {success && <p className="text-green-400 text-sm">{success}</p>}

        <button
          onClick={handleRegister}
          className="bg-green-600 hover:bg-green-700 py-2 rounded"
        >
          Create Account
        </button>

        <button
          onClick={onSwitchToLogin}
          className="text-sm text-slate-400 hover:text-white mt-2"
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  )
}

export default Register
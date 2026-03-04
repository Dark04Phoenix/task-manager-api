import { useState, useContext } from "react"
import { login } from "../api/api"
import { AuthContext } from "../context/AuthContext"

export default function Login({ onSwitchToRegister }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { loginUser } = useContext(AuthContext)

  async function handleLogin(e) {
    e.preventDefault()

    try {
      const data = await login(username, password)

      console.log("LOGIN DATA:", data)

      if (!data || !data.access_token) {
        throw new Error("No access_token in response")
      }

      loginUser(data.access_token)

    } catch (error) {
      console.error("LOGIN ERROR:", error)
      alert("Login failed")
    }
  }

  return (
    <div className="w-full max-w-md bg-slate-800 p-8 rounded-2xl shadow-2xl">
      <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded-lg font-semibold"
        >
          Login
        </button>
      </form>

      <button
        type="button"
        onClick={onSwitchToRegister}
        className="mt-4 text-sm text-slate-400 hover:text-white w-full"
      >
        Don’t have an account? Register
      </button>
    </div>
  )
}
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "./context/AuthContext"
import Login from "./pages/Login"
import { getTasks, createTask, deleteTask, updateTask } from "./api/api"
import Register from "./pages/Register"

function App() {
  const { token, logoutUser } = useContext(AuthContext)

  // ---------------- STATE ----------------
  const [showRegister, setShowRegister] = useState(false)
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState("")
  const [editingId, setEditingId] = useState(null)
  const [editingTitle, setEditingTitle] = useState("")

  // ---------------- FETCH TASKS ----------------
  useEffect(() => {
    if (!token) return

    getTasks(token)
      .then(data => setTasks(data))
      .catch(err => console.error("Error fetching tasks:", err))
  }, [token])

  // ---------------- CREATE ----------------
  async function handleAddTask() {
    if (!newTask.trim()) return

    try {
      const created = await createTask(token, newTask)
      setTasks(prev => [...prev, created])
      setNewTask("")
    } catch (err) {
      console.error("Create failed:", err)
    }
  }

  // ---------------- DELETE ----------------
  async function handleDelete(taskId) {
    try {
      await deleteTask(token, taskId)
      setTasks(prev => prev.filter(task => task.id !== taskId))
    } catch (err) {
      console.error("Delete failed:", err)
    }
  }

  // ---------------- TOGGLE ----------------
  async function handleToggle(task) {
    try {
      const updated = await updateTask(token, task.id, {
        is_done: !task.is_done,
      })

      setTasks(prev =>
        prev.map(t => (t.id === task.id ? updated : t))
      )
    } catch (err) {
      console.error("Toggle failed:", err)
    }
  }

  // ---------------- EDIT ----------------
  function handleEdit(task) {
    setEditingId(task.id)
    setEditingTitle(task.title)
  }

  async function handleSave(taskId) {
    if (!editingTitle.trim()) return

    try {
      const updated = await updateTask(token, taskId, {
        title: editingTitle,
      })

      setTasks(prev =>
        prev.map(t => (t.id === taskId ? updated : t))
      )

      setEditingId(null)
      setEditingTitle("")
    } catch (err) {
      console.error("Edit failed:", err)
    }
  }

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        {!token ? (
        showRegister ? (
        <Register onSwitchToLogin={() => setShowRegister(false)} />
        ) : (
        <Login onSwitchToRegister={() => setShowRegister(true)} />
       )
        ) : (
        <div className="bg-slate-800 p-10 rounded-2xl shadow-2xl w-full max-w-2xl">
          <h1 className="text-3xl font-bold mb-6">Task Manager</h1>

          <button
            onClick={logoutUser}
            className="mb-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md"
          >
            Logout
          </button>

          {/* Add Task */}
          <div className="flex gap-2 mb-4">
            <input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="New task..."
              className="flex-1 p-2 rounded-md bg-slate-700"
            />

            <button
              onClick={handleAddTask}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md"
            >
              Add
            </button>
          </div>

          {/* Task List */}
          <div className="bg-slate-700 p-4 rounded-lg space-y-3">
            {tasks.length === 0 ? (
              <p className="text-slate-300">No tasks yet</p>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex justify-between items-center bg-slate-600 p-2 rounded-md"
                >
                  {editingId === task.id ? (
                    <div className="flex gap-2 w-full">
                      <input
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        className="flex-1 p-1 rounded bg-slate-700"
                      />
                      <button
                        onClick={() => handleSave(task.id)}
                        className="bg-green-600 px-2 py-1 rounded text-sm"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={task.is_done}
                          onChange={() => handleToggle(task)}
                        />
                        <span
                          className={
                            task.is_done
                              ? "line-through text-slate-400"
                              : ""
                          }
                        >
                          {task.title}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(task)}
                          className="bg-blue-500 px-2 py-1 rounded text-sm"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(task.id)}
                          className="bg-red-500 px-2 py-1 rounded text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
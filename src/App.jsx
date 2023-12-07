import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/context";

import LoginPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";
import ProtectedRoutes from "./ProtectedRoutes";
import { Profile } from "./pages/profile";
import { HomePage } from "./pages/homepage";
import { TaskProvider } from "./context/taskContext";
import TaskFormPage from "./pages/taskformPage";
import { TaskPage } from "./pages/taskpage";
import { Navbar } from "./components/navbar";

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <main className="container mx-auto px-10">
            <Navbar />
            <Routes>
              {/* rutas publicas */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* usuario logeado */}
              <Route element={<ProtectedRoutes />}>
                <Route path="/tasks" element={<TaskPage />} />
                <Route path="/add-task" element={<TaskFormPage />} />
                <Route path="/tasks/:id" element={<TaskFormPage />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;

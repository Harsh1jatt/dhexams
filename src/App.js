import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import InstituteLogin from './pages/InstituteLogin';
import StudentLogin from './pages/StudentLogin';
import PrivateRoute from './pages/components/PrivateRoute';
import OwnerLogin from './pages/OwnerLogin';
import OwnerDashboard from './pages/components/OwnerDashboard';
import Exams from './pages/studentarea/Exams';
import Sprofile from './pages/studentarea/Sprofile';
import TypingExam from './pages/studentarea/TypingExam';
import Rules from './pages/studentarea/Rules';
import StudentExam from './pages/studentarea/StudentExam';
import StudentLayout from './pages/studentarea/StudentLayout';
import { ProfileProvider } from './contexts/ProfileContext';
import ExamResult from './pages/studentarea/ExamResult';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/admin-login" element={<InstituteLogin />} />
        <Route path="/owner-login" element={<OwnerLogin />} />
        <Route path="/" element={<StudentLogin />} />

        {/* Student Routes - Protected by ProfileProvider */}
        <Route
          element={
            <ProfileProvider>
              <StudentLayout />
            </ProfileProvider>
          }
        >
          <Route path="/exams" element={<Exams />} />
          <Route path="/profile" element={<Sprofile />} />
          <Route path="/typing" element={<TypingExam />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/exam" element={<StudentExam />} />
          <Route path="/result" element={<ExamResult />} />
        </Route>

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/owner-dashboard"
          element={
            <PrivateRoute>
              <OwnerDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

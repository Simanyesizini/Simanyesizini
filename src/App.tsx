import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Education from './pages/Education';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import Certifications from './pages/Certifications';
import Contact from './pages/Contact';
import { PortfolioProvider } from './contexts/PortfolioContext';
import { AuthProvider, DataProvider, ToastProvider } from './admin';
import AdminLogin from './admin/pages/Login';
import AdminLayout from './admin/components/AdminLayout';
import Dashboard from './admin/pages/Dashboard';
import ProfileManagement from './admin/pages/Profile';
import EducationManagement from './admin/pages/Education';
import ExperienceManagement from './admin/pages/Experience';
import ProjectsManagement from './admin/pages/Projects';
import CertificationsManagement from './admin/pages/Certifications';
import ContactManagement from './admin/pages/Contact';
import Settings from './admin/pages/Settings';
import { ProtectedRoute } from './admin';

function App() {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <PortfolioProvider>
            <ToastProvider>
              <Routes>
                {/* Public Portfolio Routes */}
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="about" element={<About />} />
                  <Route path="education" element={<Education />} />
                  <Route path="experience" element={<Experience />} />
                  <Route path="projects" element={<Projects />} />
                  <Route path="certifications" element={<Certifications />} />
                  <Route path="contact" element={<Contact />} />
                </Route>

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLogin />} />
                <Route
                  path="/admin/*"
                  element={
                    <ProtectedRoute>
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="profile" element={<ProfileManagement />} />
                  <Route path="education" element={<EducationManagement />} />
                  <Route path="experience" element={<ExperienceManagement />} />
                  <Route path="projects" element={<ProjectsManagement />} />
                  <Route path="certifications" element={<CertificationsManagement />} />
                  <Route path="contact" element={<ContactManagement />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
              </Routes>
            </ToastProvider>
          </PortfolioProvider>
        </DataProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

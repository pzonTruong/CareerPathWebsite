import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '@/shared/components/layout/AppLayout';
import { AuthLayout } from '@/modules/auth/components/AuthLayout';
import { ProtectedRoute } from '@/modules/auth/components/ProtectedRoute';
import { LoginPage } from '@/modules/auth/pages/LoginPage';
import { RegisterPage } from '@/modules/auth/pages/RegisterPage';
import { ForgotPasswordPage } from '@/modules/auth/pages/ForgotPasswordPage';
import { LogoutPage } from '@/modules/auth/pages/LogoutPage';
import { HomePage } from '@/modules/home/pages/HomePage';
import { ProfilePage } from '@/modules/profile/pages/ProfilePage';

// Public Landing Imports
import { LandingLayout } from '@/modules/landing/components/LandingLayout';
import { LandingHomePage } from '@/modules/landing/pages/LandingHomePage';
import { LandingRoadmapPage } from '@/modules/landing/pages/LandingRoadmapPage';
import { LandingFeaturePage } from '@/modules/landing/pages/LandingFeaturePage';
import { LandingContractPage } from '@/modules/landing/pages/LandingContractPage';

function App() {
  return (
    <Routes>
      {/* Public Landing Routes */}
      <Route element={<LandingLayout />}>
        <Route path="/" element={<LandingHomePage />} />
        <Route path="/roadmaps" element={<LandingRoadmapPage />} />
        <Route path="/features" element={<LandingFeaturePage />} />
        <Route path="/contract" element={<LandingContractPage />} />
        <Route path="/contact" element={<Navigate to="/contract" replace />} />
      </Route>

      {/* Auth routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>
      <Route path="/logout" element={<LogoutPage />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/me" element={<Navigate to="/profile" replace />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

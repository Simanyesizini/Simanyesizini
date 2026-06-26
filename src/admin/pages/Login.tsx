import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, Shield, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function AdminLogin() {
  const [accessCode, setAccessCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [error, setError] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showForgotHint, setShowForgotHint] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = login(accessCode);

    setTimeout(() => {
      setLoading(false);
      if (result.success) {
        navigate('/admin/dashboard');
      } else {
        setError(result.error || 'Invalid access code');
        if (result.cooldown) {
          setCooldown(result.cooldown);
        }
        setAccessCode('');
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Admin Access</h1>
          <p className="text-neutral-400">Enter your access code to manage content</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Access Code Field */}
            <div>
              <label htmlFor="accessCode" className="block text-sm font-medium text-neutral-700 mb-2">
                Access Code
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-neutral-400" />
                </div>
                <input
                  type={showCode ? 'text' : 'password'}
                  id="accessCode"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  disabled={cooldown > 0 || loading}
                  className="w-full pl-12 pr-12 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:opacity-50 disabled:bg-neutral-50"
                  placeholder="Enter access code"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCode(!showCode)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  {showCode ? (
                    <EyeOff className="w-5 h-5 text-neutral-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-neutral-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Cooldown Timer */}
            {cooldown > 0 && (
              <div className="flex items-center gap-2 text-yellow-600 text-sm bg-yellow-50 p-3 rounded-lg">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>Please wait {cooldown} seconds before trying again.</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={cooldown > 0 || loading || !accessCode}
              className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Forgot Code */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setShowForgotHint(!showForgotHint)}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Forgot access code?
            </button>
            {showForgotHint && (
              <div className="mt-3 p-4 bg-neutral-50 rounded-lg text-sm text-neutral-600">
                <p className="mb-2">Contact the portfolio owner:</p>
                <a
                  href="mailto:Simanyetevin@gmail.com"
                  className="text-primary-600 hover:underline font-medium"
                >
                  Simanyetevin@gmail.com
                </a>
              </div>
            )}
          </div>
        </div>

        {/* No Registration Notice */}
        <p className="mt-6 text-center text-sm text-neutral-500">
          Single-user admin panel. No registration available.
        </p>
      </div>
    </div>
  );
}

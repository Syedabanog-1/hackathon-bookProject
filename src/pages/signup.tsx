// frontend/src/pages/signup.tsx
import React, { useState } from 'react';
import { useHistory } from '@docusaurus/router';
import Layout from '@theme/Layout';
import SignupForm from '../components/Auth/SignupForm';
import { authService } from '../services/authService';
import { SignupData } from '../types/user';

const SignupPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const history = useHistory();

  const handleSubmit = async (data: SignupData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await authService.signup(data);
      setSuccess(true);
      // Redirect after showing success message
      setTimeout(() => {
        history.push('/');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during signup.');
      console.error("Signup error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout
      title="Sign Up"
      description="Sign up for an account to personalize your Docusaurus experience."
    >
      <main style={{
        minHeight: 'calc(100vh - 60px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        padding: '40px 20px'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '500px',
          margin: '0 auto'
        }}>
          {/* Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '40px'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 20px',
              background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
              boxShadow: '0 10px 30px rgba(220, 38, 38, 0.3)'
            }}>
              🤖
            </div>
            <h1 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#ffffff',
              marginBottom: '8px',
              textShadow: '0 2px 10px rgba(0,0,0,0.3)'
            }}>
              Create Account
            </h1>
            <p style={{
              fontSize: '16px',
              color: '#9ca3af',
              margin: 0
            }}>
              Join us to personalize your learning experience
            </p>
          </div>

          {/* Success Message */}
          {success && (
            <div style={{
              padding: '16px 20px',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              border: '2px solid #10b981',
              borderRadius: '12px',
              marginBottom: '24px',
              textAlign: 'center',
              animation: 'slideIn 0.3s ease'
            }}>
              <p style={{
                color: '#10b981',
                fontSize: '18px',
                fontWeight: '600',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}>
                <span style={{ fontSize: '24px' }}>✅</span>
                Account Successfully Created
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div style={{
              padding: '16px 20px',
              backgroundColor: 'rgba(59, 130, 246, 0.15)',
              border: '2px solid #3b82f6',
              borderRadius: '12px',
              marginBottom: '24px',
              textAlign: 'center',
              animation: 'slideIn 0.3s ease'
            }}>
              <p style={{
                color: '#3b82f6',
                fontSize: '18px',
                fontWeight: '600',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}>
                <span style={{ fontSize: '24px' }}>⚠️</span>
                Try Again
              </p>
            </div>
          )}

          {/* Form Card */}
          <div style={{
            backgroundColor: '#1f1f1f',
            borderRadius: '16px',
            padding: '40px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(220, 38, 38, 0.2)'
          }}>
            <SignupForm onSubmit={handleSubmit} isLoading={isLoading} error={null} />
          </div>

          {/* Footer */}
          <div style={{
            textAlign: 'center',
            marginTop: '24px'
          }}>
            <p style={{
              color: '#9ca3af',
              fontSize: '14px'
            }}>
              Already have an account?{' '}
              <a
                href="/login"
                style={{
                  color: '#dc2626',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#dc2626'}
              >
                Sign In
              </a>
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default SignupPage;
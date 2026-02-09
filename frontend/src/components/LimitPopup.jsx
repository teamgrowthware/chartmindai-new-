import React from 'react';
import { useNavigate } from 'react-router-dom';

export const LimitPopup = ({ show, onClose }) => {
  const navigate = useNavigate();

  if (!show) return null;

  const handleSignUp = () => {
    navigate('/pricing');
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-cyan-500/30 rounded-2xl p-8 max-w-md w-full shadow-2xl shadow-cyan-500/20 relative overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/50">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>

          {/* Content */}
          <h2 className="text-2xl font-bold text-center mb-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            Limit Reached
          </h2>
          <p className="text-slate-300 text-center mb-6 leading-relaxed">
            You've used all <span className="font-bold text-cyan-400">3 free analyses</span>. Upgrade to Pro to unlock unlimited chart analysis and premium features!
          </p>

          {/* Benefits */}
          <div className="bg-slate-800/50 rounded-lg p-4 mb-6 border border-slate-700">
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-cyan-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Unlimited chart analyses
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-cyan-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Advanced AI insights
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-cyan-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save and track your analyses
              </li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-all duration-200 border border-slate-600"
            >
              Close
            </button>
            <button
              onClick={handleSignUp}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70"
            >
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

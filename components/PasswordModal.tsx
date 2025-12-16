import React, { useState, useRef, useEffect } from 'react';
import { LockClosedIcon } from './icons/Icons';

interface PasswordModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const CORRECT_PASSWORD = 'goldyea'; // Hardcoded password

export default function PasswordModal({ onClose, onSuccess }: PasswordModalProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      onSuccess();
    } else {
      setError('incorrect password. try again.');
      setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300">
      <div
        className="bg-[#112240] p-8 rounded-lg shadow-2xl border border-[#233554] w-full max-w-sm m-4 transform transition-all duration-300 scale-95 animate-fade-in-up"
        style={{ animation: 'fadeInUp 0.3s ease-out forwards' }}
      >
        <div className="flex flex-col items-center text-center">
          <LockClosedIcon className="h-12 w-12 text-white mb-4" />
          <h2 className="text-xl font-semibold text-[#ccd6f6] mb-2">section locked</h2>
          <p className="text-[#8892b0] mb-6 text-sm">please enter the password to continue.</p>
          <form onSubmit={handleSubmit} className="w-full">
            <input
              ref={inputRef}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0a192f] border border-[#233554] text-[#ccd6f6] rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-white placeholder:text-[#4a5f7b]"
              placeholder="password"
            />
            {error && <p className="text-red-400 text-xs mb-4">{error}</p>}
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-transparent border border-[#233554] text-[#8892b0] py-2 rounded-md hover:bg-[#233554] transition-colors"
              >
                cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-white text-[#0a192f] py-2 rounded-md hover:bg-slate-200 transition-colors font-semibold"
              >
                unlock
              </button>
            </div>
          </form>
        </div>
      </div>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
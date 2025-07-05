'use client';

import { useState } from 'react';
import { FiDownload } from 'react-icons/fi';

interface FileDownloadProps {
  onDownload: (port: number) => Promise<void>;
  isDownloading: boolean;
}

export default function FileDownload({ onDownload, isDownloading }: FileDownloadProps) {
  const [inviteCode, setInviteCode] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const port = parseInt(inviteCode.trim(), 10);
    if (isNaN(port) || port <= 0 || port > 65535) {
      setError('Please enter a valid port number (1-65535)');
      return;
    }
    
    try {
      await onDownload(port);
    } catch (err) {
      setError('Failed to download the file. Please check the invite code and try again.');
    }
  };
  
  return (
    <div className="max-w-md mx-auto space-y-8">
      {/* Header Card */}
      <div className="relative p-8 bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 rounded-3xl shadow-2xl overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -translate-y-20 translate-x-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-y-16 -translate-x-16 animate-pulse delay-1000"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
        
        <div className="relative flex items-center space-x-5">
          <div className="flex-shrink-0 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Receive File</h3>
            <p className="text-violet-100 text-sm leading-relaxed">
              Enter your secure invite code to download the file instantly
            </p>
          </div>
        </div>
      </div>
      
      {/* Main Form */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-8 space-y-6">
          <div className="space-y-3">
            <label htmlFor="inviteCode" className="block text-sm font-bold text-gray-800 uppercase tracking-wide">
              Invite Code
            </label>
            <div className="relative group">
              <input
                type="text"
                id="inviteCode"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                placeholder="Enter invite code..."
                className={`
                  w-full px-5 py-4 text-lg font-mono bg-gray-50 border-2 rounded-2xl transition-all duration-300
                  focus:outline-none focus:ring-4 focus:ring-violet-100 focus:border-violet-400 focus:bg-white
                  group-hover:bg-white group-hover:border-gray-300
                  ${error 
                    ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-100' 
                    : 'border-gray-200'
                  }
                  ${isDownloading ? 'opacity-50 cursor-not-allowed' : ''}
                `}
                disabled={isDownloading}
                required
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmit(e);
                  }
                }}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                <div className="p-2 rounded-lg bg-gray-200 group-hover:bg-gray-300 transition-colors">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 16H9v-2L2.257 7.257A6 6 0 0112 2h3aM7 9H5v2h2V9z" />
                  </svg>
                </div>
              </div>
            </div>
            {error && (
              <div className="flex items-center space-x-3 p-4 bg-red-50 border-l-4 border-red-400 rounded-r-xl">
                <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-red-700">{error}</p>
              </div>
            )}
          </div>
          
          <button
            type="button"
            onClick={handleSubmit}
            className={`
              w-full px-6 py-5 text-lg font-bold rounded-2xl transition-all duration-300
              flex items-center justify-center space-x-3 shadow-lg
              ${isDownloading
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed shadow-none'
                : 'bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white shadow-violet-200 hover:shadow-xl hover:shadow-violet-300 transform hover:scale-[1.02] active:scale-[0.98]'
              }
            `}
            disabled={isDownloading}
          >
            {isDownloading ? (
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                <span>Downloading...</span>
              </div>
            ) : (
              <>
                <div className="p-1 bg-white/20 rounded-lg">
                  <FiDownload className="w-5 h-5" />
                </div>
                <span>Download File</span>
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Info Card */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-6 shadow-sm">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-sm text-blue-800">
            <p className="font-bold mb-3">How it works:</p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Get the invite code from the sender</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Enter the code in the field above</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Click "Download File" to receive instantly</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
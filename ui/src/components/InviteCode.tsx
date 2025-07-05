'use client';

import { useState } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';

interface InviteCodeProps {
  port: number | null;
}

export default function InviteCode({ port }: InviteCodeProps) {
  const [copied, setCopied] = useState(false);
  
  if (!port) return null;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(port.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-100 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>
      
      <div className="relative">
        <div className="flex items-center space-x-3 mb-4">
          <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-green-800">File Ready to Share!</h3>
            <p className="text-sm text-green-600">
              Share this invite code with anyone you want to share the file with
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-green-200 overflow-hidden">
          <div className="flex items-center">
            <div className="flex-1 px-6 py-4 bg-gradient-to-r from-gray-50 to-white">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                Invite Code
              </div>
              <div className="font-mono text-2xl font-bold text-gray-800 tracking-wider">
                {port}
              </div>
            </div>
            <button
              onClick={copyToClipboard}
              className={`px-6 py-4 h-full transition-all duration-300 ${
                copied
                  ? 'bg-green-500 text-white'
                  : 'bg-indigo-500 hover:bg-indigo-600 text-white hover:shadow-lg'
              }`}
              aria-label="Copy invite code"
            >
              <div className="flex flex-col items-center space-y-1">
                {copied ? (
                  <FiCheck className="w-6 h-6" />
                ) : (
                  <FiCopy className="w-6 h-6" />
                )}
                <span className="text-xs font-medium">
                  {copied ? 'Copied!' : 'Copy'}
                </span>
              </div>
            </button>
          </div>
        </div>
        
        <div className="mt-4 flex items-center space-x-2 text-sm text-gray-600">
          <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 14.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <span>This code will be valid as long as your file sharing session is active</span>
        </div>
        
        <div className="mt-4 p-3 bg-white/50 rounded-lg border border-green-200">
          <p className="text-xs text-gray-600">
            <span className="font-medium">How to share:</span> Send this code to your recipient. They can use it in the "Receive a File" tab to download your file directly.
          </p>
        </div>
      </div>
    </div>
  );
}
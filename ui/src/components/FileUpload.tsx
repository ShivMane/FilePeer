'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  isUploading: boolean;
}

export default function FileUpload({ onFileUpload, isUploading }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles[0]);
    }
  }, [onFileUpload]);
  
  const { getRootProps, getInputProps } = useDropzone({ 
    onDrop,
    multiple: false,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
    onDropAccepted: () => setDragActive(false),
    onDropRejected: () => setDragActive(false),
  });

  return (
    <div className="space-y-8">
      <div 
        {...getRootProps()} 
        className={`
          relative w-full p-16 border-2 border-dashed rounded-3xl text-center cursor-pointer transition-all duration-500 overflow-hidden
          ${dragActive 
            ? 'border-purple-400 bg-gradient-to-br from-purple-900/40 to-pink-900/40 shadow-2xl scale-105 backdrop-blur-sm' 
            : 'border-gray-600 hover:border-purple-400 hover:bg-gradient-to-br hover:from-purple-900/20 hover:to-pink-900/20 hover:shadow-xl backdrop-blur-sm'
          }
          ${isUploading ? 'opacity-50 pointer-events-none' : ''}
        `}
      >
        {/* Enhanced background decoration */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full -translate-y-20 translate-x-20 blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full translate-y-16 -translate-x-16 blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-2xl"></div>
        
        <input {...getInputProps()} />
        <div className="relative flex flex-col items-center justify-center space-y-8">
          <div className={`
            relative p-8 rounded-full transition-all duration-500 group
            ${dragActive 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-2xl scale-125 animate-pulse' 
              : 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 hover:from-purple-500/30 hover:to-pink-500/30 hover:shadow-xl hover:scale-110 backdrop-blur-sm border border-white/10'
            }
          `}>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <FiUpload className={`
              w-12 h-12 transition-all duration-500 relative z-10
              ${dragActive ? 'text-white scale-110' : 'text-purple-300 group-hover:text-white'}
            `} />
          </div>
          
          <div className="space-y-2">
            <p className={`
              text-xl font-bold transition-all duration-300
              ${dragActive ? 'text-indigo-600' : 'text-gray-800'}
            `}>
              {dragActive ? 'Drop your file here!' : 'Drag & drop a file here'}
            </p>
            <p className="text-black-500 text-sm">
              or click to select a file from your device
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="h-px bg-gray-300 flex-1"></div>
            <span className="text-xs text-black-400 font-medium">SECURE TRANSFER</span>
            <div className="h-px bg-gray-300 flex-1"></div>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-black-500">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>End-to-end encrypted</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Direct transfer</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-green-800">Secure</p>
              <p className="text-xs text-green-600">End-to-end encrypted</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-800">Fast</p>
              <p className="text-xs text-blue-600">Direct P2P transfer</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-purple-800">Private</p>
              <p className="text-xs text-purple-600">No cloud storage</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
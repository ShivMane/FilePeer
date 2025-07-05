'use client';

import { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import FileDownload from '@/components/FileDownload';
import InviteCode from '@/components/InviteCode';
import axios from 'axios';

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [port, setPort] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'download'>('upload');

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file);
    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setPort(response.data.port);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleDownload = async (port: number) => {
    setIsDownloading(true);
    
    try {
      // Request download from Java backend
      const response = await axios.get(`/api/download/${port}`, {
        responseType: 'blob',
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      
      // Try to get filename from response headers
      // Axios normalizes headers to lowercase, but we need to handle different cases
      const headers = response.headers;
      let contentDisposition = '';
      
      // Look for content-disposition header regardless of case
      for (const key in headers) {
        if (key.toLowerCase() === 'content-disposition') {
          contentDisposition = headers[key];
          break;
        }
      }
      
      let filename = 'downloaded-file';
      
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch && filenameMatch.length === 2) {
          filename = filenameMatch[1];
        }
      }
      
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Failed to download file. Please check the invite code and try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Advanced Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse"></div>
        {/* Animated particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full opacity-50 animate-bounce"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-purple-300 rounded-full opacity-60 animate-ping"></div>
        <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-blue-300 rounded-full opacity-40 animate-pulse"></div>
      </div>
      
      <div className="relative container mx-auto px-4 py-8 max-w-4xl">
        <header className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-3xl mb-8 shadow-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl blur opacity-75 animate-pulse"></div>
            <svg className="w-12 h-12 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
          </div>
          <h1 className="text-7xl font-black bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-6 tracking-tight">
            PeerLink
          </h1>
          <p className="text-2xl text-gray-300 font-semibold mb-2">Secure P2P File Sharing</p>
          <p className="text-lg text-gray-400">Share files directly between devices with military-grade encryption</p>
        </header>
        
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden relative">
          {/* Glassmorphism effect enhancement */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-white/5 pointer-events-none"></div>
          {/* Enhanced tabs */}
          <div className="flex bg-black/20 backdrop-blur-sm border-b border-white/10 relative">
            <button
              className={`flex-1 px-8 py-6 font-semibold text-lg transition-all duration-500 relative overflow-hidden ${
                activeTab === 'upload'
                  ? 'text-white bg-gradient-to-r from-purple-600/30 to-pink-600/30 shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
              onClick={() => setActiveTab('upload')}
            >
              <div className="flex items-center justify-center space-x-2 relative z-10">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span>Share a File</span>
              </div>
              {activeTab === 'upload' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-pink-400 shadow-lg"></div>
              )}
            </button>
            <button
              className={`flex-1 px-8 py-6 font-semibold text-lg transition-all duration-500 relative overflow-hidden ${
                activeTab === 'download'
                  ? 'text-white bg-gradient-to-r from-blue-600/30 to-cyan-600/30 shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
              onClick={() => setActiveTab('download')}
            >
              <div className="flex items-center justify-center space-x-2 relative z-10">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Receive a File</span>
              </div>
              {activeTab === 'download' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 shadow-lg"></div>
              )}
            </button>
          </div>
          
          <div className="p-8 relative z-10">
            {activeTab === 'upload' ? (
              <div className="space-y-6">
                <FileUpload onFileUpload={handleFileUpload} isUploading={isUploading} />
                
                {uploadedFile && !isUploading && (
                  <div className="p-6 bg-gradient-to-r from-emerald-900/40 to-green-900/40 border border-emerald-400/30 rounded-2xl backdrop-blur-sm">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-lg font-bold text-emerald-100">
                          File selected successfully
                        </p>
                        <p className="text-sm text-emerald-300 truncate">
                          <span className="font-medium">{uploadedFile.name}</span> ({Math.round(uploadedFile.size / 1024)} KB)
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {isUploading && (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center mb-6">
                      <div className="relative">
                        <div className="w-20 h-20 border-4 border-purple-900/30 rounded-full"></div>
                        <div className="absolute top-0 left-0 w-20 h-20 border-4 border-purple-400 rounded-full animate-spin border-t-transparent shadow-lg"></div>
                        <div className="absolute top-2 left-2 w-16 h-16 border-4 border-pink-400/50 rounded-full animate-spin border-t-transparent" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-white mb-2">Uploading file...</p>
                    <p className="text-lg text-gray-300">Please wait while we process your file securely</p>
                  </div>
                )}
                
                <InviteCode port={port} />
              </div>
            ) : (
              <div className="space-y-6">
                <FileDownload onDownload={handleDownload} isDownloading={isDownloading} />
                
                {isDownloading && (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center mb-6">
                      <div className="relative">
                        <div className="w-20 h-20 border-4 border-blue-900/30 rounded-full"></div>
                        <div className="absolute top-0 left-0 w-20 h-20 border-4 border-blue-400 rounded-full animate-spin border-t-transparent shadow-lg"></div>
                        <div className="absolute top-2 left-2 w-16 h-16 border-4 border-cyan-400/50 rounded-full animate-spin border-t-transparent" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-white mb-2">Downloading file...</p>
                    <p className="text-lg text-gray-300">Your download will start shortly</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        <footer className="mt-16 text-center">
          <div className="inline-flex items-center space-x-3 text-gray-400 text-sm bg-black/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10">
            <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-gray-300">PeerLink &copy; {new Date().getFullYear()} - Secure P2P File Sharing</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
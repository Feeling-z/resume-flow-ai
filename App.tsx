import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import { AppView, ResumeData, INITIAL_RESUME } from './types';

function App() {
  const [view, setView] = useState<AppView>(AppView.LANDING);
  const [resumeData, setResumeData] = useState<ResumeData>(INITIAL_RESUME);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Header currentView={view} setView={setView} />

      <main className="h-[calc(100vh-4rem)]">
        {view === AppView.LANDING ? (
          <Hero setView={setView} />
        ) : (
          <div className="flex flex-col lg:flex-row h-full overflow-hidden">
            {/* Left Side: Form Builder */}
            <div className="w-full lg:w-1/2 h-full bg-white border-r border-slate-200 p-4 lg:p-6 overflow-hidden flex flex-col no-print">
               <div className="mb-4 flex justify-between items-center">
                 <h2 className="text-2xl font-bold text-slate-800">Editor</h2>
                 <div className="text-xs text-slate-500">
                   Autosaving...
                 </div>
               </div>
               <ResumeForm data={resumeData} updateData={setResumeData} />
            </div>

            {/* Right Side: Live Preview */}
            <div className="w-full lg:w-1/2 h-full bg-slate-100 relative">
               <ResumePreview data={resumeData} />
            </div>
          </div>
        )}
      </main>
      
      {/* Hidden footer for SEO structure only */}
      <footer className="hidden">
        <p>&copy; 2024 ResumeFlow AI. Inspired by n8n automation.</p>
      </footer>
    </div>
  );
}

export default App;
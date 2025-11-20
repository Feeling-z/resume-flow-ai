import React from 'react';
import { AppView } from '../types';
import { FileText, LayoutTemplate, Sparkles, FileDown } from 'lucide-react';

interface HeaderProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 no-print">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => setView(AppView.LANDING)}
        >
          <div className="bg-primary text-white p-1.5 rounded-lg">
            <FileText size={24} />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-cyan-600">
            ResumeFlow AI
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <button onClick={() => setView(AppView.LANDING)} className="text-slate-600 hover:text-primary transition-colors">产品功能</button>
          <button onClick={() => setView(AppView.LANDING)} className="text-slate-600 hover:text-primary transition-colors">价格方案</button>
          <button onClick={() => setView(AppView.LANDING)} className="text-slate-600 hover:text-primary transition-colors">精选模板</button>
        </nav>

        <div className="flex items-center gap-4">
          {currentView === AppView.LANDING ? (
            <button 
              onClick={() => setView(AppView.BUILDER)}
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700 transition-all hover:scale-105 active:scale-95"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              创建简历
            </button>
          ) : (
            <button 
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-2 text-sm font-medium text-white shadow hover:bg-slate-800 transition-all"
              onClick={() => window.print()}
              title="打印预览或另存为"
            >
               导出 Word
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

import React from 'react';
import { AppView } from '../types';
import { CheckCircle, Zap, FileCheck, ArrowRight, Star, LayoutTemplate } from 'lucide-react';

interface HeroProps {
  setView: (view: AppView) => void;
}

const Hero: React.FC<HeroProps> = ({ setView }) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] opacity-20"></div>
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm text-indigo-600 mb-8">
            <span className="flex h-2 w-2 rounded-full bg-indigo-600 mr-2"></span>
            已升级至 Gemini 2.5 Flash 模型
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl mx-auto mb-6">
            利用 <span className="text-primary">AI 智能</span> 打造完美简历
          </h1>
          <p className="mx-auto max-w-[700px] text-slate-600 md:text-xl mb-10 leading-relaxed">
            告别繁琐的手动排版。我们的 AI 工作流能深度分析您的经历，瞬间生成专业级 Word 简历。支持自由编辑，比人工写手更智能，比传统模板更高效。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setView(AppView.BUILDER)}
              className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-lg font-medium text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-700 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              立即制作简历 <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button className="inline-flex h-12 items-center justify-center rounded-lg border border-slate-200 bg-white px-8 text-lg font-medium shadow-sm transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
              查看范例
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-slate-50 border hover:shadow-md transition-shadow">
              <div className="p-4 bg-indigo-100 rounded-full text-indigo-600">
                <Zap size={32} />
              </div>
              <h3 className="text-xl font-bold">AI 内容润色</h3>
              <p className="text-slate-500">
                只需输入草稿或关键点，Gemini 引擎将自动重写为专业、结果导向的职场语言。
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-slate-50 border hover:shadow-md transition-shadow">
              <div className="p-4 bg-teal-100 rounded-full text-teal-600">
                <FileCheck size={32} />
              </div>
              <h3 className="text-xl font-bold">ATS 系统友好</h3>
              <p className="text-slate-500">
                所有模板均经过严格测试，确保生成的文档能顺利通过大公司的简历筛选系统 (ATS)。
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-slate-50 border hover:shadow-md transition-shadow">
              <div className="p-4 bg-rose-100 rounded-full text-rose-600">
                <LayoutTemplate size={32} />
              </div>
              <h3 className="text-xl font-bold">导出 Word 可编辑</h3>
              <p className="text-slate-500">
                随时切换不同设计风格，支持一键导出方便二次修改的 Word (.docx) 文件。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / Monetization */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">简单透明的价格</h2>
            <p className="mt-4 text-slate-400">免费开始，升级解锁无限 AI 算力。</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="flex flex-col p-8 bg-slate-800 rounded-2xl border border-slate-700">
              <h3 className="text-2xl font-bold mb-2">入门版</h3>
              <div className="text-4xl font-bold mb-6">¥0<span className="text-lg text-slate-400 font-normal">/月</span></div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center"><CheckCircle className="mr-3 h-5 w-5 text-indigo-400" /> 1 款简历模板</li>
                <li className="flex items-center"><CheckCircle className="mr-3 h-5 w-5 text-indigo-400" /> 手动内容录入</li>
                <li className="flex items-center"><CheckCircle className="mr-3 h-5 w-5 text-indigo-400" /> Word (.docx) 导出</li>
              </ul>
              <button 
                onClick={() => setView(AppView.BUILDER)}
                className="w-full py-3 rounded-lg border border-slate-600 hover:bg-slate-700 font-semibold transition-colors"
              >
                开始制作
              </button>
            </div>

            {/* Pro Plan */}
            <div className="flex flex-col p-8 bg-indigo-600 rounded-2xl border border-indigo-500 relative shadow-2xl shadow-indigo-900/50">
              <div className="absolute top-0 right-0 -mt-4 mr-4 bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">热门</div>
              <h3 className="text-2xl font-bold mb-2">专业版 AI</h3>
              <div className="text-4xl font-bold mb-6">¥88<span className="text-lg text-indigo-200 font-normal">/月</span></div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center"><Star className="mr-3 h-5 w-5 text-white" /> 无限次 AI 智能润色</li>
                <li className="flex items-center"><Star className="mr-3 h-5 w-5 text-white" /> 解锁所有高级模板</li>
                <li className="flex items-center"><Star className="mr-3 h-5 w-5 text-white" /> 求职信生成器</li>
                <li className="flex items-center"><Star className="mr-3 h-5 w-5 text-white" /> 优先技术支持</li>
              </ul>
              <button 
                 onClick={() => setView(AppView.BUILDER)}
                 className="w-full py-3 rounded-lg bg-white text-indigo-600 hover:bg-slate-100 font-bold transition-colors"
              >
                获取专业版权限
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;

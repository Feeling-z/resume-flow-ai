import React, { useState } from 'react';
import { ResumeData, TemplateStyle } from '../types';
import { CloudLightning, CheckCircle, AlertCircle, Palette, FileText, User, Briefcase, Mail } from 'lucide-react';

// REPLACE THIS WITH YOUR ACTUAL N8N WEBHOOK URL
const WEBHOOK_URL = "https://d92a4c0176f7.ngrok-free.app/webhook-test/generate-resume";

interface ResumeFormProps {
  data: ResumeData;
  updateData: (data: ResumeData) => void;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ data, updateData }) => {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleInputChange = (field: keyof ResumeData, value: any) => {
    updateData({ ...data, [field]: value });
  };

  const handleSubmitToCloud = async () => {
    if (!data.email) {
      alert("请输入邮箱地址以便接收简历。");
      return;
    }
    if (!data.rawResumeContent) {
      alert("请粘贴您的工作经历或简历内容。");
      return;
    }

    setSubmitStatus('submitting');

    // Map internal TemplateStyle to backend expected values (blue, red, grey, creative)
    const styleMap: Record<TemplateStyle, string> = {
      'Business Blue': 'blue',
      'Energetic Red': 'red',
      'Minimalist Grey': 'grey',
      'Creative': 'creative'
    };

    // Construct the specific JSON payload requested
    const payload = {
      user_name: data.fullName,
      job_title: data.jobTitle,
      email: data.email,
      raw_experience: data.rawResumeContent,
      selected_template: styleMap[data.templateStyle] || 'blue'
    };

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitStatus('success');
      } else {
        // Even if 404/500, for this demo we might want to show error, 
        // but if using a dummy URL, it will fail.
        // If using a real URL that returns 200, it goes to success.
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error("Submission error:", error);
      // Fallback for demo purposes if the user hasn't replaced the URL yet
      if (WEBHOOK_URL.includes('YOUR_N8N_WEBHOOK_URL_HERE')) {
         // Simulate network delay for demo
         setTimeout(() => setSubmitStatus('success'), 2000);
      } else {
         setSubmitStatus('error');
      }
    }
  };

  const getTemplateNameCN = (style: TemplateStyle) => {
    switch(style) {
      case 'Business Blue': return '商务蓝';
      case 'Energetic Red': return '活力红';
      case 'Minimalist Grey': return '极简灰';
      case 'Creative': return '创意设计';
      default: return style;
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-xl shadow-sm border p-6 space-y-8 h-full overflow-y-auto pb-32">
      
      {/* Header */}
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-2xl font-bold text-slate-800">简历信息</h2>
        <p className="text-slate-500 text-sm mt-1">
          填写基本信息并粘贴您的经历草稿，AI 将为您自动排版和润色。
        </p>
      </div>

      {/* Style Selection */}
      <section className="bg-indigo-50 p-5 rounded-xl border border-indigo-100">
        <h2 className="text-sm font-bold text-indigo-900 mb-3 flex items-center gap-2 uppercase tracking-wider">
          <Palette className="w-4 h-4" />
          选择简历风格
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {(['Business Blue', 'Energetic Red', 'Minimalist Grey', 'Creative'] as TemplateStyle[]).map((style) => (
            <button
              key={style}
              onClick={() => handleInputChange('templateStyle', style)}
              className={`p-3 rounded-lg text-xs font-bold border transition-all flex flex-col items-center justify-center text-center gap-2 h-20 ${
                data.templateStyle === style
                  ? 'bg-white border-indigo-600 shadow-md text-indigo-700 ring-1 ring-indigo-600'
                  : 'bg-white/50 border-slate-200 text-slate-500 hover:bg-white hover:border-indigo-300 hover:text-indigo-600'
              }`}
            >
              <div className={`w-4 h-4 rounded-full ${
                style === 'Business Blue' ? 'bg-blue-600' :
                style === 'Energetic Red' ? 'bg-red-500' :
                style === 'Minimalist Grey' ? 'bg-slate-600' :
                'bg-purple-600'
              }`} />
              {getTemplateNameCN(style)}
            </button>
          ))}
        </div>
      </section>

      {/* Essential Info */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <User className="w-5 h-5 text-slate-400" />
          个人信息
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">姓名</label>
            <input 
              type="text" 
              className="w-full rounded-lg border border-slate-300 p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              value={data.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              placeholder="例如：张三"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">求职意向 / 目标职位</label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                className="w-full pl-9 rounded-lg border border-slate-300 p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                value={data.jobTitle}
                onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                placeholder="例如：高级产品经理" 
              />
            </div>
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
              电子邮箱 <span className="text-rose-500 text-xs font-bold">(必填)</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <input 
                type="email" 
                className={`w-full pl-9 rounded-lg border p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none transition-all ${
                  !data.email && submitStatus === 'error' ? 'border-rose-300 bg-rose-50' : 'border-slate-300'
                }`}
                value={data.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="zhangsan@example.com"
                required
              />
            </div>
            <p className="text-xs text-slate-500">生成的 PDF 简历将发送至此邮箱。</p>
          </div>
        </div>
      </section>

      {/* Bulk Experience Input */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <FileText className="w-5 h-5 text-slate-400" />
            工作经历与内容
          </h2>
          <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">AI 驱动</span>
        </div>
        
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700">
            请粘贴您的工作经历 / 简历草稿 (支持AI润色) <span className="text-rose-500">*</span>
          </label>
          <textarea 
            className="w-full h-64 rounded-lg border border-slate-300 p-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none text-sm leading-relaxed shadow-inner"
            placeholder="请在此处粘贴您 LinkedIn 的“经历”部分，或者简单列出您的工作历史、教育背景和技能。

例如：
腾讯 高级软件工程师 (2020-至今)
- 负责微信支付核心模块开发
- 带领 5 人团队重构交易系统，提升了 30% 性能
- 熟练掌握 Java, Go, K8s

教育背景：
浙江大学 计算机科学学士 2019"
            value={data.rawResumeContent}
            onChange={(e) => handleInputChange('rawResumeContent', e.target.value)}
          />
          <p className="text-xs text-slate-500">
            无需担心格式。我们的 AI 会自动解析此文本，将其整理为专业简历格式，并修正语法错误。
          </p>
        </div>
      </section>

      {/* Submit Action */}
      <section className="pt-4">
        {submitStatus === 'success' ? (
          <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 flex flex-col items-center text-center gap-3 text-emerald-800 animate-in fade-in zoom-in duration-300">
            <div className="bg-emerald-100 p-3 rounded-full">
              <CheckCircle className="h-8 w-8 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg">请求已发送！</h3>
              <p className="text-sm font-medium mt-2">
                成功！您的简历正在生成中，稍后将发送至您的邮箱。
              </p>
            </div>
            <button 
              onClick={() => setSubmitStatus('idle')}
              className="mt-4 text-sm font-semibold text-emerald-700 hover:text-emerald-900 underline decoration-emerald-300 underline-offset-4"
            >
              创建新简历
            </button>
          </div>
        ) : (
           <div className="space-y-3">
            <button
              onClick={handleSubmitToCloud}
              disabled={submitStatus === 'submitting'}
              className="w-full group relative flex items-center justify-center gap-3 bg-slate-900 hover:bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-slate-200 hover:shadow-indigo-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              {submitStatus === 'submitting' ? (
                <>
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  正在生成中... (请稍候)
                </>
              ) : (
                <>
                  <CloudLightning className="h-5 w-5 text-yellow-400 group-hover:text-white transition-colors" />
                  立即生成简历
                </>
              )}
            </button>
            
            {submitStatus === 'error' && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-100 text-center text-sm text-rose-600 flex items-center justify-center gap-2">
                <AlertCircle className="h-4 w-4" />
                连接失败，请检查网络。
              </div>
            )}
            
            <p className="text-center text-xs text-slate-400 max-w-xs mx-auto leading-tight">
              点击生成即表示您同意通过我们的云端引擎处理您的数据。
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default ResumeForm;

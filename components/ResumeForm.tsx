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
      alert("Email is required to receive your resume.");
      return;
    }
    if (!data.rawResumeContent) {
      alert("Please paste your experience or current resume content.");
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

  return (
    <div className="w-full max-w-2xl bg-white rounded-xl shadow-sm border p-6 space-y-8 h-full overflow-y-auto pb-32">
      
      {/* Header */}
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-2xl font-bold text-slate-800">Resume Details</h2>
        <p className="text-slate-500 text-sm mt-1">
          Fill in your basics and paste your rough experience. Our AI will handle the formatting and polishing.
        </p>
      </div>

      {/* Style Selection */}
      <section className="bg-indigo-50 p-5 rounded-xl border border-indigo-100">
        <h2 className="text-sm font-bold text-indigo-900 mb-3 flex items-center gap-2 uppercase tracking-wider">
          <Palette className="w-4 h-4" />
          Select Template Style
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
              {style.replace('Business ', '').replace('Energetic ', '').replace('Minimalist ', '')}
            </button>
          ))}
        </div>
      </section>

      {/* Essential Info */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <User className="w-5 h-5 text-slate-400" />
          Personal Information
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Full Name</label>
            <input 
              type="text" 
              className="w-full rounded-lg border border-slate-300 p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              value={data.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              placeholder="Jane Doe"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Target Job Title</label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                className="w-full pl-9 rounded-lg border border-slate-300 p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                value={data.jobTitle}
                onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                placeholder="Senior Project Manager" 
              />
            </div>
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
              Email Address <span className="text-rose-500 text-xs font-bold">(Required)</span>
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
                placeholder="jane@company.com"
                required
              />
            </div>
            <p className="text-xs text-slate-500">We will send the generated PDF to this email.</p>
          </div>
        </div>
      </section>

      {/* Bulk Experience Input */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <FileText className="w-5 h-5 text-slate-400" />
            Experience & Content
          </h2>
          <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">AI Powered</span>
        </div>
        
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700">
            Paste Your Experience / Current Resume <span className="text-rose-500">*</span>
          </label>
          <textarea 
            className="w-full h-64 rounded-lg border border-slate-300 p-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none text-sm leading-relaxed shadow-inner"
            placeholder="Paste your entire LinkedIn 'Experience' section here, or dump a rough list of your job history, education, and skills. 

Example:
Software Engineer at Google (2020-Present)
- Built search algorithms
- Managed team of 5
...

Education:
BS CS from Stanford 2019"
            value={data.rawResumeContent}
            onChange={(e) => handleInputChange('rawResumeContent', e.target.value)}
          />
          <p className="text-xs text-slate-500">
            Don't worry about formatting. Our AI will parse this text, structure it into a professional format, and fix grammar.
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
              <h3 className="font-bold text-lg">Request Sent!</h3>
              <p className="text-sm font-medium mt-2">
                Success! Your resume is being generated and will be sent to your email shortly.
              </p>
            </div>
            <button 
              onClick={() => setSubmitStatus('idle')}
              className="mt-4 text-sm font-semibold text-emerald-700 hover:text-emerald-900 underline decoration-emerald-300 underline-offset-4"
            >
              Create Another Resume
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
                  Generating... (Please wait)
                </>
              ) : (
                <>
                  <CloudLightning className="h-5 w-5 text-yellow-400 group-hover:text-white transition-colors" />
                  Generate Resume with AI
                </>
              )}
            </button>
            
            {submitStatus === 'error' && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-100 text-center text-sm text-rose-600 flex items-center justify-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Connection failed. Please verify your network.
              </div>
            )}
            
            <p className="text-center text-xs text-slate-400 max-w-xs mx-auto leading-tight">
              By clicking Generate, you agree to process your data via our secure cloud engine.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default ResumeForm;

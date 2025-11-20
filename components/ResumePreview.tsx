import React from 'react';
import { ResumeData, TemplateStyle } from '../types';
import { Eye, Lock, Mail } from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeData;
}

// PLACEHOLDER IMAGES: 对应用户选择的静态图片逻辑
const TEMPLATE_IMAGES: Record<TemplateStyle, string> = {
  'Business Blue': 'https://placehold.co/595x842/EFF6FF/1E40AF?text=Business+Blue+Style&font=roboto',
  'Energetic Red': 'https://placehold.co/595x842/FEF2F2/DC2626?text=Energetic+Red+Style&font=roboto',
  'Minimalist Grey': 'https://placehold.co/595x842/F8FAFC/334155?text=Minimalist+Grey+Style&font=roboto',
  'Creative': 'https://placehold.co/595x842/FAF5FF/7E22CE?text=Creative+Purple+Style&font=roboto',
};

const ResumePreview: React.FC<ResumePreviewProps> = ({ data }) => {
  // 默认为商务蓝，防止未定义情况
  const previewUrl = TEMPLATE_IMAGES[data.templateStyle] || TEMPLATE_IMAGES['Business Blue'];

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
    <div className="w-full h-full bg-slate-200/80 p-6 md:p-12 overflow-y-auto flex flex-col items-center justify-center">
      
      {/* Header Badge */}
      <div className="mb-8 flex flex-col items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="bg-white/90 backdrop-blur shadow-sm px-4 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-500 flex items-center gap-2 uppercase tracking-wider">
          <Eye className="w-3 h-3 text-indigo-500" />
          实时效果预览
        </div>
      </div>

      {/* Preview Container */}
      <div className="relative group w-full max-w-[400px] shadow-2xl rounded-sm overflow-hidden border-[8px] border-white transition-all duration-500 hover:shadow-indigo-500/20 hover:scale-[1.02]">
        
        {/* The Static Image */}
        <img 
          src={previewUrl} 
          alt={`${data.templateStyle} Preview`}
          className="w-full h-auto object-cover block opacity-90 group-hover:opacity-100 transition-opacity"
        />

        {/* Overlay Info (Always visible slightly, fully on hover) */}
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center text-white p-8 text-center">
          <div className="bg-white/10 p-4 rounded-full mb-4 backdrop-blur-md border border-white/20">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-2">{getTemplateNameCN(data.templateStyle)}</h3>
          <p className="text-sm text-slate-200 leading-relaxed mb-6">
            这是所选风格的排版预览。您的具体内容将由云端 AI 引擎进行专业排版生成。
          </p>
          
          {data.email && (
            <div className="flex items-center gap-2 bg-indigo-600/80 px-4 py-2 rounded-lg text-xs font-medium">
              <Mail className="w-3 h-3" />
              成品将发送至：{data.email}
            </div>
          )}
        </div>
      </div>

      {/* Footer Hint */}
      <div className="mt-8 text-center">
        <h4 className="text-slate-700 font-semibold text-sm">
          当前选择：{getTemplateNameCN(data.templateStyle)}
        </h4>
        <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
          最终生成的 Word (.docx) 文件将严格遵循此设计规范，方便您二次编辑。
        </p>
      </div>

    </div>
  );
};

export default ResumePreview;

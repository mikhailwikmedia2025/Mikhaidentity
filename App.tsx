import React, { useState, useRef, useEffect } from 'react';
import { FormDataType } from './types';
import { SECTIONS, DESTINATION_EMAIL, LOGO_TYPES, FONT_STYLES, MOCKUP_TYPES, DELIVERY_FORMATS } from './constants';
import { StepIndicator } from './components/StepIndicator';
import { FormField } from './components/FormField';
import { 
  ChevronRight, 
  ChevronLeft, 
  Send, 
  Copy, 
  CheckCircle,
  AlertCircle,
  Loader2,
  Mail
} from 'lucide-react';

const INITIAL_DATA: FormDataType = {
  companyName: '',
  email: '',
  phone: '',
  businessField: '',
  uniqueSellingPoint: '',
  vision: '',
  mission: '',
  coreValues: '',
  targetAudience: '',
  brandType: '',
  buyerPersona: '',
  brandImpression: '',
  preferredStyle: '',
  colors: '',
  brandReferences: '',
  logoType: [],
  visualElements: '',
  avoidElements: '',
  logoUsage: [],
  fontLanguage: '',
  fontStyle: '',
  fontExamples: '',
  mockupsNeeded: [],
  usageScenarios: '',
  deliveryFormats: [],
  deadline: '',
  budget: '',
  additionalNotes: ''
};

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormDataType>(INITIAL_DATA);
  const [copySuccess, setCopySuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  
  // Submission States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); 

  // Check for success param on load (to show animation after redirect)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('submitted') === 'true') {
      setIsSubmitted(true);
      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const updateField = (field: keyof FormDataType, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: keyof FormDataType, value: string) => {
    setFormData(prev => {
      const currentArray = prev[field] as string[];
      if (currentArray.includes(value)) {
        return { ...prev, [field]: currentArray.filter(item => item !== value) };
      } else {
        return { ...prev, [field]: [...currentArray, value] };
      }
    });
  };

  const nextStep = () => {
    if (currentStep < SECTIONS.length) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const generateEmailBody = () => {
    return `
BRAND IDENTITY BRIEF SUBMISSION

1. CLIENT INFO
------------------
Name: ${formData.companyName}
Email: ${formData.email}
Phone: ${formData.phone}

2. BUSINESS DETAILS
------------------
Field: ${formData.businessField}
USP: ${formData.uniqueSellingPoint}
Vision: ${formData.vision}
Mission: ${formData.mission}
Values: ${formData.coreValues}

3. TARGET AUDIENCE
------------------
Audience: ${formData.targetAudience}
Type: ${formData.brandType}
Persona: ${formData.buyerPersona}

4. VISUAL IDENTITY
------------------
Impression: ${formData.brandImpression}
Style: ${formData.preferredStyle}
Colors: ${formData.colors}
Refs: ${formData.brandReferences}

5. LOGO DETAILS
------------------
Type: ${formData.logoType.join(', ')}
Elements to Include: ${formData.visualElements}
Elements to Avoid: ${formData.avoidElements}
Usage: ${formData.logoUsage.join(', ')}

6. TYPOGRAPHY
------------------
Language: ${formData.fontLanguage}
Style: ${formData.fontStyle}
Examples: ${formData.fontExamples}

7. MOCKUPS
------------------
Required: ${formData.mockupsNeeded.join(', ')}
Scenarios: ${formData.usageScenarios}
Formats: ${formData.deliveryFormats.join(', ')}

8. ADDITIONAL INFO
------------------
Deadline: ${formData.deadline}
Budget: ${formData.budget}
Notes: ${formData.additionalNotes}
    `.trim();
  };

  const submitBrief = () => {
    setIsSubmitting(true);
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateEmailBody()).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    });
  };

  const InputClass = "w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all";
  const CheckboxClass = "w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500";

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-10 max-w-lg w-full text-center">
          <div className="checkmark-wrapper mb-8">
            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
              <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">تم استلام طلبك بنجاح!</h2>
          <h3 className="text-xl text-gray-600 mb-6">Your brief has been submitted.</h3>
          
          <div className="bg-green-50 text-green-800 p-4 rounded-lg mb-6 text-sm">
            تم إرسال نسخة من البيانات إلى البريد الإلكتروني.<br/>
            سنقوم بمراجعة التفاصيل والتواصل معك قريباً.
          </div>

          <button 
            onClick={() => window.location.href = window.location.pathname}
            className="text-indigo-600 hover:text-indigo-800 font-medium underline"
          >
            إرسال طلب جديد / Start New Brief
          </button>
        </div>
      </div>
    );
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Client Info
        return (
          <>
            <FormField labelAr="اسم الشركة / البراند؟" labelEn="What is the brand/company name?" required>
              <input type="text" className={InputClass} value={formData.companyName} onChange={e => updateField('companyName', e.target.value)} placeholder="My Brand Name" />
            </FormField>
            <FormField labelAr="بريدك الإلكتروني للتواصل؟" labelEn="Your contact email?" required>
              <input type="email" className={InputClass} value={formData.email} onChange={e => updateField('email', e.target.value)} placeholder="name@example.com" />
            </FormField>
            <FormField labelAr="رقم الهاتف؟" labelEn="Phone number?" required>
              <input type="tel" className={InputClass} value={formData.phone} onChange={e => updateField('phone', e.target.value)} placeholder="+20 123 456 7890" />
            </FormField>
          </>
        );
      case 1: // Business Details
        return (
          <>
            <FormField labelAr="ما هو مجال عمل الشركة؟" labelEn="What is your business field?">
              <input type="text" className={InputClass} value={formData.businessField} onChange={e => updateField('businessField', e.target.value)} />
            </FormField>
            <FormField labelAr="ما الذي يميزكم عن المنافسين؟" labelEn="What makes your brand unique compared to competitors?">
              <textarea className={InputClass} rows={3} value={formData.uniqueSellingPoint} onChange={e => updateField('uniqueSellingPoint', e.target.value)} />
            </FormField>
            <FormField labelAr="ما هي رؤية الشركة (Vision)؟" labelEn="What is your company vision?">
              <textarea className={InputClass} rows={2} value={formData.vision} onChange={e => updateField('vision', e.target.value)} />
            </FormField>
            <FormField labelAr="ما هي رسالة الشركة (Mission)؟" labelEn="What is your company mission?">
              <textarea className={InputClass} rows={2} value={formData.mission} onChange={e => updateField('mission', e.target.value)} />
            </FormField>
            <FormField labelAr="قيم البراند الأساسية؟" labelEn="What are your core brand values?">
              <input type="text" className={InputClass} value={formData.coreValues} onChange={e => updateField('coreValues', e.target.value)} />
            </FormField>
          </>
        );
      case 2: // Audience
        return (
          <>
            <FormField labelAr="من هو جمهورك المستهدف؟" labelEn="Who is your target audience?">
              <textarea className={InputClass} rows={3} value={formData.targetAudience} onChange={e => updateField('targetAudience', e.target.value)} placeholder="Age, gender, location, interests..." />
            </FormField>
            <FormField labelAr="هل البراند B2B ولا B2C؟" labelEn="Is your brand B2B or B2C?">
              <div className="flex gap-4">
                {['B2B', 'B2C', 'Both'].map(opt => (
                  <label key={opt} className={`flex-1 p-3 border rounded-lg cursor-pointer text-center ${formData.brandType === opt ? 'bg-indigo-50 border-indigo-500 text-indigo-700 font-bold' : 'bg-white text-gray-700'}`}>
                    <input type="radio" name="brandType" className="hidden" value={opt} checked={formData.brandType === opt} onChange={() => updateField('brandType', opt)} />
                    {opt}
                  </label>
                ))}
              </div>
            </FormField>
            <FormField labelAr="شخصية العميل المثالي؟ (Buyer Persona)" labelEn="Describe your ideal customer (Buyer Persona).">
              <textarea className={InputClass} rows={3} value={formData.buyerPersona} onChange={e => updateField('buyerPersona', e.target.value)} />
            </FormField>
          </>
        );
      case 3: // Visual Identity
        return (
          <>
             <FormField labelAr="إيه الانطباع اللي تريد أن يشعر به الناس عند رؤية البراند؟" labelEn="What first impression should people get from your brand?">
              <input type="text" className={InputClass} value={formData.brandImpression} onChange={e => updateField('brandImpression', e.target.value)} placeholder="Luxury, Modern, Strong, Minimal..." />
            </FormField>
            <FormField labelAr="هل هناك ستايل معين تفضله؟" labelEn="Do you prefer a specific style?">
              <input type="text" className={InputClass} value={formData.preferredStyle} onChange={e => updateField('preferredStyle', e.target.value)} />
            </FormField>
            <FormField labelAr="هل هناك ألوان تريد استخدامها أو تجنبها؟" labelEn="Any colors you prefer or want to avoid?">
              <input type="text" className={InputClass} value={formData.colors} onChange={e => updateField('colors', e.target.value)} />
            </FormField>
            <FormField labelAr="هل لديك أمثلة لبراندز أو لوجوهات تعجبك؟" labelEn="Do you have references or brands you like? (Link)">
              <textarea className={InputClass} rows={3} value={formData.brandReferences} onChange={e => updateField('brandReferences', e.target.value)} placeholder="Paste links to Pinterest, Behance, or Drive..." />
            </FormField>
          </>
        );
      case 4: // Logo
        return (
          <>
            <FormField labelAr="نوع اللوجو المطلوب؟" labelEn="What logo type do you prefer?">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {LOGO_TYPES.map(type => (
                  <label key={type.id} className={`relative overflow-hidden border-2 rounded-xl cursor-pointer transition-all group ${formData.logoType.includes(type.id) ? 'border-indigo-600 bg-indigo-50 ring-2 ring-indigo-200' : 'border-gray-200 hover:border-gray-300 bg-white'}`}>
                    <input type="checkbox" className="hidden" checked={formData.logoType.includes(type.id)} onChange={() => toggleArrayItem('logoType', type.id)} />
                    
                    <div className="h-32 bg-gray-100 overflow-hidden">
                      <img src={type.image} alt={type.label} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                    
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-gray-900">{type.label}</span>
                        {formData.logoType.includes(type.id) && <CheckCircle className="w-5 h-5 text-indigo-600" />}
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">{type.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </FormField>
            <FormField labelAr="ما العناصر البصرية المطلوبة إن وجدت؟" labelEn="Any visual elements you want included?">
              <input type="text" className={InputClass} value={formData.visualElements} onChange={e => updateField('visualElements', e.target.value)} />
            </FormField>
            <FormField labelAr="ما العناصر التي يجب تجنبها؟" labelEn="Any elements you want to avoid?">
              <input type="text" className={InputClass} value={formData.avoidElements} onChange={e => updateField('avoidElements', e.target.value)} />
            </FormField>
            <FormField labelAr="أماكن استخدام اللوجو؟" labelEn="Where will the logo be mainly used?">
              <div className="flex flex-wrap gap-2">
                {['Social Media', 'Print', 'Products', 'Website'].map(item => (
                   <label key={item} className={`px-4 py-2 border rounded-full text-sm cursor-pointer select-none ${formData.logoUsage.includes(item) ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700'}`}>
                    <input type="checkbox" className="hidden" checked={formData.logoUsage.includes(item)} onChange={() => toggleArrayItem('logoUsage', item)} />
                    {item}
                  </label>
                ))}
              </div>
            </FormField>
          </>
        );
      case 5: // Typography
        return (
          <>
             <FormField labelAr="الخط المطلوب عربي/إنجليزي أم الاثنين؟" labelEn="Fonts needed: Arabic, English, or both?">
              <select className={InputClass} value={formData.fontLanguage} onChange={e => updateField('fontLanguage', e.target.value)}>
                <option value="">Select Option / اختر</option>
                <option value="Arabic">Arabic Only</option>
                <option value="English">English Only</option>
                <option value="Both">Both (Arabic & English)</option>
              </select>
            </FormField>
            
            <FormField labelAr="نوعية الخط المطلوبة؟" labelEn="Font style preference?">
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {FONT_STYLES.map(style => (
                     <label key={style.id} className={`flex flex-col border rounded-lg cursor-pointer overflow-hidden transition-all ${formData.fontStyle.includes(style.id) ? 'border-indigo-600 ring-1 ring-indigo-300' : 'border-gray-200 hover:border-gray-300'}`}>
                       <input 
                          type="radio" 
                          name="fontStyle" 
                          className="hidden" 
                          value={style.id} 
                          checked={formData.fontStyle === style.id} 
                          onChange={() => updateField('fontStyle', style.id)} 
                        />
                        <div className="h-20 bg-gray-50">
                          <img src={style.image} alt={style.label} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-3">
                          <span className="font-bold text-gray-900 block text-sm">{style.label}</span>
                          <span className="text-xs text-gray-500">{style.description}</span>
                        </div>
                     </label>
                  ))}
               </div>
              <input type="text" className={InputClass} value={formData.fontStyle} onChange={e => updateField('fontStyle', e.target.value)} placeholder="أو اكتب وصفاً خاصاً هنا / Or type custom style..." />
            </FormField>

             <FormField labelAr="أمثلة خطوط تعجبك؟" labelEn="Any fonts you like? (Names or Links)">
              <input type="text" className={InputClass} value={formData.fontExamples} onChange={e => updateField('fontExamples', e.target.value)} />
            </FormField>
          </>
        );
      case 6: // Mockups
        return (
          <>
             <FormField labelAr="ما أنواع الموكابس المطلوبة؟" labelEn="What mockups do you need?">
               <div className="space-y-2">
                {MOCKUP_TYPES.map(item => (
                  <label key={item} className="flex items-center space-x-3 space-x-reverse cursor-pointer">
                    <input type="checkbox" className={CheckboxClass} checked={formData.mockupsNeeded.includes(item)} onChange={() => toggleArrayItem('mockupsNeeded', item)} />
                    <span className="text-gray-700">{item}</span>
                  </label>
                ))}
               </div>
            </FormField>
             <FormField labelAr="سيناريوهات الاستخدام؟" labelEn="Any specific usage scenarios you want covered?">
              <input type="text" className={InputClass} value={formData.usageScenarios} onChange={e => updateField('usageScenarios', e.target.value)} />
            </FormField>
            <FormField labelAr="فورمات التسليم المطلوبة؟" labelEn="Delivery formats needed?">
               <div className="flex flex-wrap gap-2">
                {DELIVERY_FORMATS.map(item => (
                   <label key={item} className={`px-3 py-1 border rounded text-sm cursor-pointer ${formData.deliveryFormats.includes(item) ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-700'}`}>
                    <input type="checkbox" className="hidden" checked={formData.deliveryFormats.includes(item)} onChange={() => toggleArrayItem('deliveryFormats', item)} />
                    {item}
                  </label>
                ))}
              </div>
            </FormField>
          </>
        );
      case 7: // Additional
        return (
          <>
            <FormField labelAr="الديدلاين المطلوب؟" labelEn="Deadline for the project?">
              <input type="date" className={InputClass} value={formData.deadline} onChange={e => updateField('deadline', e.target.value)} />
            </FormField>
            <FormField labelAr="ميزانية المشروع؟" labelEn="Project budget?">
              <input type="text" className={InputClass} value={formData.budget} onChange={e => updateField('budget', e.target.value)} placeholder="$ or EGP" />
            </FormField>
            <FormField labelAr="أي ملاحظات أو تفاصيل إضافية؟" labelEn="Any notes or additional details?">
              <textarea className={InputClass} rows={4} value={formData.additionalNotes} onChange={e => updateField('additionalNotes', e.target.value)} />
            </FormField>
          </>
        );
      case 8: // Summary
        return (
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">الملخص / Summary</h3>
            <div className="space-y-4 text-sm max-h-96 overflow-y-auto pr-2 custom-scrollbar">
              <SummaryRow label="Brand Name" value={formData.companyName} />
              <SummaryRow label="Email" value={formData.email} />
              <SummaryRow label="Phone" value={formData.phone} />
              <SummaryRow label="Field" value={formData.businessField} />
              <SummaryRow label="Brand Type" value={formData.brandType} />
              <SummaryRow label="Logo Types" value={formData.logoType.join(', ')} />
              <SummaryRow label="Deadline" value={formData.deadline} />
              <SummaryRow label="Budget" value={formData.budget} />
            </div>
            
            <div className="mt-8 bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-bold mb-1">Confirm & Send</p>
                <p>Upon sending, you will be redirected back here to confirm.</p>
                <p className="mt-1 text-xs">سيتم إعادة توجيهك إلى هنا مرة أخرى لتأكيد النجاح.</p>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <button 
                onClick={submitBrief}
                disabled={isSubmitting}
                className={`flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-indigo-700'}`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Submit Brief (إرسال الطلب)
                  </>
                )}
              </button>
              
              <button 
                onClick={handleCopy}
                className={`flex-1 py-3 px-6 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors border-2 ${copySuccess ? 'border-green-500 text-green-700 bg-green-50' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
              >
                {copySuccess ? <CheckCircle size={20} /> : <Copy size={20} />}
                {copySuccess ? 'Copied!' : 'Copy to Clipboard (نسخ)'}
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Construct the Return URL (current page + ?submitted=true)
  const returnUrl = typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}?submitted=true` : '';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4 sm:px-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-900 text-white p-6 sm:p-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">طلب تصميم هوية بصرية</h1>
          <p className="text-indigo-200 text-lg">Brand Identity Design Brief</p>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8">
          <StepIndicator currentStep={currentStep} />
          
          <div className="min-h-[400px]">
            {renderStepContent()}
          </div>
        </div>

        {/* Footer / Navigation */}
        {!isSubmitted && (
          <div className="bg-gray-50 p-6 border-t border-gray-100 flex justify-between items-center">
            {currentStep > 0 ? (
              <button 
                onClick={prevStep}
                disabled={isSubmitting}
                className="flex items-center text-gray-600 hover:text-indigo-600 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="ml-1 w-5 h-5" />
                السابق / Back
              </button>
            ) : (
              <div></div> // Spacer
            )}

            {currentStep < SECTIONS.length ? (
              <button 
                onClick={nextStep}
                disabled={(currentStep === 0 && (!formData.companyName || !formData.email)) || isSubmitting}
                className={`flex items-center py-2 px-6 rounded-full font-bold transition-all ${
                  (currentStep === 0 && (!formData.companyName || !formData.email)) || isSubmitting
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg'
                }`}
              >
                التالي / Next
                <ChevronLeft className="mr-1 w-5 h-5" />
              </button>
            ) : null}
          </div>
        )}
      </div>

      {/* Hidden Form for Netlify/FormSubmit */}
      <form 
        ref={formRef}
        action={`https://formsubmit.co/${DESTINATION_EMAIL}`} 
        method="POST" 
        className="hidden"
      >
        {/* Config Fields */}
        <input type="hidden" name="_subject" value={`New Brief: ${formData.companyName}`} />
        <input type="hidden" name="_template" value="box" />
        <input type="hidden" name="_captcha" value="false" />
        {/* Redirect back to the app with a success param to show the checkmark */}
        <input type="hidden" name="_next" value={returnUrl} />
        
        {/* Data Fields */}
        <input type="hidden" name="1. Company Name" value={formData.companyName} />
        <input type="hidden" name="1. Email" value={formData.email} />
        <input type="hidden" name="1. Phone" value={formData.phone} />
        
        <input type="hidden" name="2. Field" value={formData.businessField} />
        <input type="hidden" name="2. USP" value={formData.uniqueSellingPoint} />
        <input type="hidden" name="2. Vision" value={formData.vision} />
        <input type="hidden" name="2. Mission" value={formData.mission} />
        <input type="hidden" name="2. Values" value={formData.coreValues} />
        
        <input type="hidden" name="3. Audience" value={formData.targetAudience} />
        <input type="hidden" name="3. Type" value={formData.brandType} />
        <input type="hidden" name="3. Persona" value={formData.buyerPersona} />
        
        <input type="hidden" name="4. Impression" value={formData.brandImpression} />
        <input type="hidden" name="4. Style" value={formData.preferredStyle} />
        <input type="hidden" name="4. Colors" value={formData.colors} />
        <input type="hidden" name="4. Refs" value={formData.brandReferences} />
        
        <input type="hidden" name="5. Logo Type" value={formData.logoType.join(', ')} />
        <input type="hidden" name="5. Elements" value={formData.visualElements} />
        <input type="hidden" name="5. Avoid" value={formData.avoidElements} />
        <input type="hidden" name="5. Usage" value={formData.logoUsage.join(', ')} />
        
        <input type="hidden" name="6. Language" value={formData.fontLanguage} />
        <input type="hidden" name="6. Font Style" value={formData.fontStyle} />
        <input type="hidden" name="6. Font Examples" value={formData.fontExamples} />
        
        <input type="hidden" name="7. Mockups" value={formData.mockupsNeeded.join(', ')} />
        <input type="hidden" name="7. Scenarios" value={formData.usageScenarios} />
        <input type="hidden" name="7. Formats" value={formData.deliveryFormats.join(', ')} />
        
        <input type="hidden" name="8. Deadline" value={formData.deadline} />
        <input type="hidden" name="8. Budget" value={formData.budget} />
        <input type="hidden" name="8. Notes" value={formData.additionalNotes} />
      </form>
    </div>
  );
}

const SummaryRow = ({ label, value }: { label: string, value: string }) => {
  if (!value) return null;
  return (
    <div className="grid grid-cols-3 gap-4 border-b border-gray-100 pb-2 last:border-0">
      <span className="font-semibold text-gray-600 col-span-1">{label}</span>
      <span className="text-gray-900 col-span-2 break-words">{value}</span>
    </div>
  );
};

export default App;
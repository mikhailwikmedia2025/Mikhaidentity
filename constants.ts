import { SectionType } from './types';

export const DESTINATION_EMAIL = "mikhail.wikmedia@gmail.com";

export const SECTIONS: SectionType[] = [
  { id: 1, title: "بيانات العميل", subtitle: "Client Information" },
  { id: 2, title: "تفاصيل النشاط", subtitle: "Business Details" },
  { id: 3, title: "الجمهور المستهدف", subtitle: "Target Audience" },
  { id: 4, title: "الهوية البصرية", subtitle: "Visual Identity" },
  { id: 5, title: "تفاصيل اللوجو", subtitle: "Logo Details" },
  { id: 6, title: "الخطوط", subtitle: "Typography" },
  { id: 7, title: "الموكابس", subtitle: "Mockups" },
  { id: 8, title: "معلومات إضافية", subtitle: "Additional Info" },
];

// Using placehold.co for reliable visual examples without external dependencies
export const LOGO_TYPES = [
  { 
    id: 'text', 
    label: 'نصي (Wordmark)', 
    description: 'يعتمد على اسم الشركة فقط بخط مميز (مثل Google, CocaCola)',
    image: 'https://placehold.co/400x300/f3f4f6/3730a3?text=WORDMARK\nLogo&font=playfair-display' 
  },
  { 
    id: 'icon', 
    label: 'رمزي (Pictorial)', 
    description: 'رمز أو أيقونة تعبر عن البراند بدون نص (مثل Apple, Twitter)',
    image: 'https://placehold.co/400x300/f3f4f6/3730a3?text=★&font=montserrat' 
  },
  { 
    id: 'combination', 
    label: 'مزيج (Combination)', 
    description: 'يجمع بين الرمز والنص لتعزيز الاسم (مثل Adidas, Burger King)',
    image: 'https://placehold.co/400x300/f3f4f6/3730a3?text=Icon+%2B+Text&font=roboto' 
  },
  { 
    id: 'badge', 
    label: 'ختم (Emblem)', 
    description: 'النص داخل الرمز، كلاسيكي ورسمي (مثل Starbucks, Harvard)',
    image: 'https://placehold.co/400x300/f3f4f6/3730a3?text=EMBLEM&font=oswald' 
  },
  { 
    id: 'abstract', 
    label: 'مجرد (Abstract)', 
    description: 'شكل هندسي فني لا يمثل شيئاً محدداً (مثل Nike, Pepsi)',
    image: 'https://placehold.co/400x300/f3f4f6/3730a3?text=○+△+□&font=montserrat' 
  },
];

export const FONT_STYLES = [
  {
    id: 'Serif',
    label: 'Serif (كلاسيكي)',
    description: 'خطوط بزيادات في الأطراف، تعطي انطباع الفخامة والتقليدية (مثل Times New Roman).',
    image: 'https://placehold.co/400x200/ffffff/000000?text=Serif+Font&font=playfair-display'
  },
  {
    id: 'Sans Serif',
    label: 'Sans Serif (عصري)',
    description: 'خطوط بدون زيادات، عصرية ونظيفة ومقروءة (مثل Arial, Helvetica).',
    image: 'https://placehold.co/400x200/ffffff/000000?text=Sans+Serif&font=roboto'
  },
  {
    id: 'Script',
    label: 'Script (يدوي)',
    description: 'يشبه الكتابة اليدوية، يعطي طابعاً شخصياً أو إبداعياً.',
    image: 'https://placehold.co/400x200/ffffff/000000?text=Script+Style&font=dancing-script'
  },
  {
    id: 'Bold/Strong',
    label: 'Bold (ضخم/قوي)',
    description: 'خطوط سميكة تعبر عن القوة والثقة.',
    image: 'https://placehold.co/400x200/ffffff/000000?text=BOLD+FONT&font=oswald'
  }
];

export const MOCKUP_TYPES = [
  "Business Cards",
  "Social Media",
  "Packaging",
  "Uniform",
  "Signage",
  "Stationery",
  "Website header"
];

export const DELIVERY_FORMATS = [
  "AI (Illustrator)",
  "PDF",
  "PNG",
  "JPG",
  "EPS",
  "SVG"
];
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

export const LOGO_TYPES = [
  { id: 'text', label: 'نصي (Text)', icon: 'T' },
  { id: 'icon', label: 'رمزي (Icon)', icon: '★' },
  { id: 'combination', label: 'مزيج (Combination)', icon: 'T★' },
  { id: 'badge', label: 'ختم (Badge)', icon: '🛡️' },
  { id: 'abstract', label: 'مجرد (Abstract)', icon: '🎨' },
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
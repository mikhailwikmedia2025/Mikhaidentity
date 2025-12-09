export interface FormDataType {
  // Section 1: Client Info
  companyName: string;
  email: string;
  phone: string;

  // Section 2: Business Details
  businessField: string;
  uniqueSellingPoint: string;
  vision: string;
  mission: string;
  coreValues: string;

  // Section 3: Target Audience
  targetAudience: string;
  brandType: 'B2B' | 'B2C' | 'Both' | '';
  buyerPersona: string;

  // Section 4: Visual Identity
  brandImpression: string; // Luxury, Modern, etc.
  preferredStyle: string; // Minimal, Tech, etc.
  colors: string;
  brandReferences: string; // URL or description

  // Section 5: Logo Details
  logoType: string[]; // Array for multiple selections
  visualElements: string;
  avoidElements: string;
  logoUsage: string[];

  // Section 6: Typography
  fontLanguage: 'Arabic' | 'English' | 'Both' | '';
  fontStyle: string;
  fontExamples: string;

  // Section 7: Mockups
  mockupsNeeded: string[];
  usageScenarios: string;
  deliveryFormats: string[];

  // Section 8: Additional Info
  deadline: string;
  budget: string;
  additionalNotes: string;
}

export type SectionType = {
  id: number;
  title: string;
  subtitle: string;
};
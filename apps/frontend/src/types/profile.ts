export interface Profile {
  name: string;
  headline: string;
  imageUrl: string;
  contact: {
    email: string;
    phone: string;
    whatsapp?: string;
    location?: string;
    freelancer?: string;
    linkedin?: string;
    github?: string;
    googleScholar?: string;
  };
  summary: string;      
}

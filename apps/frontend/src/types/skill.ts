export interface Skill{
    name:string
    rating:number|string
}

export interface SkillCategoryData {
  id: string;
  title: string;
  show: boolean;
  priority: number; // 1 is highest priority, 99 is lowest
  items: Skill[];
}
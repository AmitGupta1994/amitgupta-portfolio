export interface Skill{
    name:string
    rating:number|string
}

export interface SkillsCategoryData{
    id:string
    name:string
    show:boolean
    priority:number
    items:Skill[]
}
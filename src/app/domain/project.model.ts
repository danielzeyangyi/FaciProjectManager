export interface Project {

    id?: string;
    name: string;
    desc?:string;
    coverImg:string;
    taskLists?: string[]; //task ids
    members?:string[];  // member ids
}
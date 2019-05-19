import { Localgroup } from "./localgroup";
import {Task} from "./task";

export class Member {
    id:number;
    birthday:Date;
    fullName:String;
    localgroup:Localgroup;
    task: Task;
}
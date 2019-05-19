import {Field} from './field';
import {Member} from './member';
import {Event} from './event';

export class Task {
    id:number;
    description:String;
    finished:Boolean;
    event:Event;
    field:Field;
    member:Member;
    
}
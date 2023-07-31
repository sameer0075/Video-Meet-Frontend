export interface FormInterface {
    inputProps:InputProps[];
}

interface InputProps {
    name:string;
    label:string;
    rules:Rules[];
    placeholder:string;
    type:string;
    stateName:string;
    formType:string;
    value?:any
    options?:DropDownOptions[];
    onChange:(args?: any) => void;
}

interface Rules {
    required:boolean;
    message?:string;
}

export interface DropDownOptions {
    label:string;
    value:string;
}
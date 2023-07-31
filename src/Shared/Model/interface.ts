import React from "react";

export interface ModelInterface {
    title:string;
    open:boolean;
    handleClose:(args?: any) => void;
    handleSubmit:(args?: any) => void;
    children:React.ReactNode
}
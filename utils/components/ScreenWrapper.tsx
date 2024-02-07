import React, {ReactNode} from 'react';
import {cn} from "../index";

type IParameters = {
    className?: string,
    children: ReactNode
}

function ScreenWrapper({className, children} : IParameters) {
    return (
        <div className={cn("w-screen h-screen", className)}>
            {children}
        </div>
    );
}

export default ScreenWrapper;
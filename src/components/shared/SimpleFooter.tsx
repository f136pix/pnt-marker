import React from 'react';

function SimpleFooter(props) {
    return (
        <div className={'absolute inset-x-0 bottom-0 bg-slate-800 h-[2rem] flex justify-center'}>
            <h1 className={'my-auto'}><a href={"https://github.com/f136pix?tab=repositories"}>https://github.com/f136pix</a></h1>
        </div>
    );
}

export default SimpleFooter;
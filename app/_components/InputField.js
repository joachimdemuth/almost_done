import React, { useState } from 'react';

const InputField = ({ label, type, name, value, onChange }) => {



    return (
        <div className='flex w-full flex-col'>
            <input
                className=' h-12 bg-gray-100 border-2 border-gray-300 rounded px-4 placeholder:text-gray-400 text-lg font-body'
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required
                placeholder={label}
            />
        </div>
    )
}

export default InputField;
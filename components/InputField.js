import React, { useState } from 'react';

const InputField = ({ label, type, name, value, onChange }) => {



    return (
        <div className='flex flex-col'>
            <input
                className=' h-12 bg-gray-100 border-2 border-gray-300 rounded-lg px-2'
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
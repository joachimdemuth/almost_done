import React, { useState } from 'react';

function KeywordsInput({formData, setFormData}) {

    const [currentKeyword, setCurrentKeyword] = useState('');

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && currentKeyword) {
            // Add the keyword to the list
           setFormData(prevFormData => ({
                ...prevFormData,
                keywords: [...prevFormData.keywords, currentKeyword]
           }))

            // Reset the current keyword input
            setCurrentKeyword('');
        }
    };

    const removeKeyword = (keywordToRemove) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            keywords: prevFormData.keywords.filter(keyword => keyword !== keywordToRemove)
        }))
    };

    return (
        <div className='flex flex-col w-full'>
            <input 
                type="text"
                value={currentKeyword}
                onChange={e => setCurrentKeyword(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a keyword and press Enter"
                className="bg-gray-100 border-2 border-gray-300 px-4 rounded h-12 placeholder:text-gray-400"
                />
            {formData.keywords.length > 0 &&(

                <div className="flex flex-wrap mt-2 gap-2">
                {formData.keywords.map(keyword => (
                    <div key={keyword} className=" bg-gray-100 border-2 border-primary-blue px-2 py-1 gap-2 rounded-3xl flex items-center text-primary-blue text-xs font-body">
                        {"#"+keyword}
                        <span 
                            className="cursor-pointer" 
                            onClick={() => removeKeyword(keyword)}
                            >
                            X
                        </span>
                    </div>
                ))}
            </div>
                )}

            
        </div>
    );
}

export default KeywordsInput;

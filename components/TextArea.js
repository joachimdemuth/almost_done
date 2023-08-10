import React from 'react';

const TextArea = ({ label, type, name, value, onChange }) => {
	return (
		<div className='flex flex-col'>

			<textarea
				className= " resize-none h-32 bg-gray-100 border-2 border-gray-300 rounded-lg px-2 py-2"
				type={type}
				id={name}
				name={name}
				value={value}
				onChange={onChange}
				required
                placeholder={label}
			/>
		</div>
	);
};

export default TextArea;

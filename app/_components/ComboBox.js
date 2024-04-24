import React, { useState } from 'react';


const ComboBox = ({ label, name, options, selected, onSelectedChange }) => {
return(

	<div className='flex w-full flex-col'>

		<select
			className='h-12 w-full bg-gray-100 border-2 border-gray-300 rounded px-2 text-gray-400 placeholder:text-gray-400 text-md font-body'
			id={name}
			name={name}
			value={selected}
			onChange={onSelectedChange}
			placeholder='Select a camera'
			required
		>
			<option value=''>Select a {label}</option>
			{options.map((option) => (
				<option key={option} value={option}>
					{option}
				</option>
			))}
		</select>

	</div>	);
};

export default ComboBox;

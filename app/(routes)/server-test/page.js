import Component from './component';
import { supabase } from '../../_utils/supabase';
import Image from 'next/image';

export const revalidate = 0


export default async function Page() {
	const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_BASE_URL;
	let { data, error } = await supabase
		.from('images_metadata')
		.select('*');

	if (error) {
		console.log(error);
	}
    


	return (
		<Component>
	
					{data.map((image, index) => {
						return (
							<div
								key={index}
								id='grid-item'
								className='flex-1 lg:max-w-[600px] lg:h-auto hover:cursor-pointer'
							>
								<Image
									width={800}
									height={800}
									className='object-contain p-1'
									alt={image?.desc}
									src={baseUrl + image?.file_path}
								/>
							</div>
						);
					})}


		</Component>
	);
}

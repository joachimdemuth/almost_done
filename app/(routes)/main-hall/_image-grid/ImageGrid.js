import Masonry from 'react-masonry-css';


async function getImages() {
	const { data, error } = await supabase.from('images_metadata').select('*');
	if (error) {
		console.error('error fetching images: ', error);
	} else {
		return data;
	}
}




export default async function ImageGrid() {
    const data = await getImages();
    const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_BASE_URL
    return(
        <Masonry
					breakpointCols={device === 'horizontal' ? 3 : 1}
					ref={gridRef}
					id='grid'
					className='flex w-full lg:px-20 justify-between items-center lg:py-10'
				>
					{data.map((image, index) => {
						return (
							<div
								onClick={() => handleOpenLightbox(index)}
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

				</Masonry>
    )
}
/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "asjnslnbgpdangbjchiu.supabase.co",
				port:'',
				pathname: '/storage/v1/object/public/public-images/analog/*',
			}

		],
		domains: [process.env.NEXT_PUBLIC_IMAGE_BASE_URL, "https://asjnslnbgpdangbjchiu.supabase.co"],
	},
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: [process.env.NEXT_PUBLIC_IMAGE_BASE_URL],
	},
};

module.exports = nextConfig;

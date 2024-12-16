/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['i.scdn.co',
            "t.scdn.co",
            "charts-images.scdn.co",
            "image-cdn-ak.spotifycdn.com",
            "mosaic.scdn.co",
            "pickasso.spotifycdn.com",
            "image-cdn-fa.spotifycdn.com",
        ], // Add other domains if needed
    },
};

export default nextConfig;

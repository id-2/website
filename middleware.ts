import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: [
    '/',
    '/monitoring',
    '/features',
    '/og',
    '/blog',
    '/blog/:path*',
    '/legal/:path*',
    '/contact',
    '/api/webhooks/:path*',
  ],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

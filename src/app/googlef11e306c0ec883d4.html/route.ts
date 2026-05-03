/**
 * @fileOverview Google Search Console HTML Verification Route.
 * satisfy the 'HTML file' ownership verification method.
 */

export async function GET() {
  return new Response('google-site-verification: googlef11e306c0ec883d4.html', {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}

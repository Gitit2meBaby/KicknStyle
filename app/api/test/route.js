// // app/api/test-wp/route.js
// import { NextResponse } from "next/server";

// export async function GET() {
//   const baseUrl = process.env.WP_URL;
//   const consumerKey = process.env.WC_CONSUMER_KEY;
//   const consumerSecret = process.env.WC_CONSUMER_SECRET;

//   try {
//     // First test basic WordPress connection
//     const wpResponse = await fetch(`${baseUrl}/wp-json/`);
//     const wpData = await wpResponse.json();

//     // Then test WooCommerce connection
//     const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
//       "base64"
//     );
//     const wcResponse = await fetch(`${baseUrl}/wp-json/wc/v3/products`, {
//       headers: {
//         Authorization: `Basic ${auth}`,
//         "Content-Type": "application/json",
//       },
//     });
//     const wcData = await wcResponse.json();

//     return NextResponse.json({
//       wordpress: {
//         status: wpResponse.status,
//         data: wpData,
//       },
//       woocommerce: {
//         status: wcResponse.status,
//         data: wcData,
//       },
//     });
//   } catch (error) {
//     return NextResponse.json(
//       {
//         error: error.message,
//         stack: error.stack,
//       },
//       { status: 500 }
//     );
//   }
// }

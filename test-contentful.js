import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { getProductBySlug, getProducts } from './lib/contentful.js';

async function test() {
  console.log("Fetching all products...");
  const all = await getProducts();
  console.log("Sculpted Art Items:", all.sculptedArt.map(p => ({ title: p.title, slug: p.slug })));
  
  if (all.sculptedArt.length >= 2) {
    const slug1 = all.sculptedArt[0].slug;
    const slug2 = all.sculptedArt[1].slug;
    console.log(`\nFetching by slug1: ${slug1}`);
    const p1 = await getProductBySlug(slug1);
    console.log(`p1 title: ${p1?.title}, slug: ${p1?.slug}`);
    
    console.log(`\nFetching by slug2: ${slug2}`);
    const p2 = await getProductBySlug(slug2);
    console.log(`p2 title: ${p2?.title}, slug: ${p2?.slug}`);
  }
}

test().catch(console.error);

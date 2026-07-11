import { db } from './src/lib/db'; 
import { events } from './src/db/schema'; 

async function main() { 
  const all = await db.select().from(events); 
  console.log(JSON.stringify(all, null, 2)); 
  process.exit(0); 
} 
main();

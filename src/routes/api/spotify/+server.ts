import {json} from '@sveltejs/kit';
import { getPlayerData } from './spotify';

export async function GET() {
  const result = await getPlayerData();

  if(!result) return new Response(null, { status: 204 });

  return json(result);
}

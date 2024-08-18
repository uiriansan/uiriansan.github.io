import {json} from '@sveltejs/kit';
import { getPlayerData } from './spotify';

export async function GET() {
  return json(await getPlayerData());
}

import {json} from '@sveltejs/kit';
import { getPlayer } from '../spotify';

export async function GET() {
  return json(await getPlayer(false));
}

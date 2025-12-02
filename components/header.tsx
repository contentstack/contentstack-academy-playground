import { getAllEntries, getHeaderRes } from '../helper';
import HeaderClient from './header-client';

export default async function Header() {
  const headerRes = await getHeaderRes();
  const entriesRes = await getAllEntries();

  return <HeaderClient initialHeader={headerRes} initialEntries={entriesRes} />;
}

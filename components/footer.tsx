import { getAllEntries, getFooterRes } from '../helper';
import FooterClient from './footer-client';

export default async function Footer() {
  const footerRes = await getFooterRes();
  const entriesRes = await getAllEntries();

  return <FooterClient initialFooter={footerRes} initialEntries={entriesRes} />;
}

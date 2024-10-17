/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import parse from "html-react-parser";
import { getAllEntries, getFooterRes } from "../helper";
import Skeleton from "react-loading-skeleton";
import { FooterProps, Entry, Links } from "../typescript/layout";

export default async function Footer() {
  const footer: FooterProps | undefined = await getFooterRes();
  const entries: Entry | undefined = await getAllEntries();

  let getFooter = footer;

  if (footer && entries) {
    const footerRes = await getFooterRes();
    getFooter = footerRes;
  }

  const footerData = getFooter ? getFooter : undefined;

  return (
    <footer>
      <div className="max-width footer-div">
        <div className="col-quarter">
          {footerData && footerData.logo ? (
            <Link legacyBehavior href="/">
              <a className="logo-tag">
                <img
                  src={footerData.logo.url}
                  alt={footerData.title}
                  title={footerData.title}
                  {...(footer?.logo?.$?.url as {})}
                  className="logo footer-logo"
                />
              </a>
            </Link>
          ) : (
            <Skeleton width={150} />
          )}
        </div>
        <div className="col-half">
          <nav>
            <ul className="nav-ul">
              {footerData ? (
                footerData.navigation.link.map((menu) => (
                  <li
                    className="footer-nav-li"
                    key={menu.title}
                    {...menu.$?.title}
                  >
                    <Link href={menu.href}>{menu.title}</Link>
                  </li>
                ))
              ) : (
                <Skeleton width={300} />
              )}
            </ul>
          </nav>
        </div>
        <div className="col-quarter social-link">
          <div className="social-nav">
            {footerData ? (
              footerData.social?.social_share.map((social) => (
                <a
                  href={social.link.href}
                  title={social.link.title}
                  key={social.link.title}
                >
                  {social.icon && (
                    <img
                      src={social.icon.url}
                      alt={social.link.title}
                      {...(social.icon.$?.url as {})}
                    />
                  )}
                </a>
              ))
            ) : (
              <Skeleton width={200} />
            )}
          </div>
        </div>
      </div>
      {footerData && typeof footerData.copyright === "string" ? (
        <div className="copyright" {...(footer?.$?.copyright as {})}>
          {parse(footerData.copyright)}
        </div>
      ) : (
        <div className="copyright">
          <Skeleton width={500} />
        </div>
      )}
    </footer>
  );
}

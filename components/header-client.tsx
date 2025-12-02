'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import parse from 'html-react-parser';
import { onEntryChange } from '../contentstack-sdk/live-preview';
import Skeleton from 'react-loading-skeleton';
import { HeaderProps, Entry, NavLinks } from "../typescript/layout";

export default function HeaderClient({ 
    initialHeader, 
    initialEntries 
}: { 
    initialHeader: HeaderProps;
    initialEntries: Entry;
}) {
  const [header, setHeaderProp] = useState<HeaderProps>(initialHeader);
  const [entries, setEntries] = useState<Entry>(initialEntries);
  const pathname = usePathname();
  const [getHeader, setHeader] = useState(header);

  function buildNavigation(ent: Entry, hd: HeaderProps) {
    let newHeader={...hd};
    if (ent.length!== newHeader.navigation_menu.length) {
          ent.forEach((entry) => {
            const hFound = newHeader?.navigation_menu.find(
              (navLink: NavLinks) => navLink.label === entry.title
            );
            if (!hFound) {
              newHeader.navigation_menu?.push({
                label: entry.title,
                page_reference: [
                  { title: entry.title, url: entry.url, $: entry.$ },
                ],
                $:{}
              });
            }
          });
    }
    return newHeader
  }

  useEffect(() => {
    if (header && entries) {
      const newHeader = buildNavigation(entries, header);
      setHeader(newHeader);
    }
  }, [header, entries]);

  useEffect(() => {
    onEntryChange(() => {
      window.location.reload();
    });
  }, []);

  const headerData = getHeader ? getHeader : undefined;
  
  return (
    <header className='header'>
      <div className='note-div'>
        {headerData?.notification_bar.show_announcement ? (
          typeof headerData.notification_bar.announcement_text === 'string' && (
            <div {...headerData.notification_bar.$?.announcement_text as {}}>
              {parse(headerData.notification_bar.announcement_text)}
            </div>
          )
        ) : (
          <Skeleton />
        )}
      </div>
      <div className='max-width header-div'>
        <div className='wrapper-logo'>
          {headerData ? (
            <Link legacyBehavior href='/'>
              <a className='logo-tag' title='Contentstack'>
                <img
                  className='logo'
                  src={headerData.logo.url}
                  alt={headerData.title}
                  title={headerData.title}
                  {...headerData.logo.$?.url as {}}
                />
              </a>
            </Link>
          ) : (
            <Skeleton width={150} />
          )}
        </div>
        <input className='menu-btn' type='checkbox' id='menu-btn' />
        <label className='menu-icon' htmlFor='menu-btn'>
          <span className='navicon' />
        </label>
        <nav className='menu'>
          <ul className='nav-ul header-ul'>
            {headerData ? (
              headerData.navigation_menu.map((list) => {
                const className =
                  pathname === list.page_reference[0].url ? 'active' : '';
                return (
                  <li
                    key={list.label}
                    className='nav-li'
                    {...list.page_reference[0].$?.url as {}}
                  >
                    <Link legacyBehavior href={list.page_reference[0].url}>
                      <a className={className}>{list.label}</a>
                    </Link>
                  </li>
                );
              })
            ) : (
              <Skeleton width={300} />
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}


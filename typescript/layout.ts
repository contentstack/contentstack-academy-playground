import { Image } from "./action";
import { Component } from "../typescript/component";

type AdditionalParam = {
  title: {};
  copyright: string;
  announcement_text: string;
  label: {};
  url: string;
}

type EntryData = {
  title: string;
  url: string;
  $: AdditionalParam;
}

type Announcement = {
  show_announcement: boolean;
  announcement_text: string;
  $: AdditionalParam;
}

type PageRef = {
  title: string;
  url: string;
  $: AdditionalParam;
}

type Share = {
  link: Links;
  icon: Image;
}

type Social = {
  social_share: [Share];
}

type Navigation = {
  link: [Links];
}

type Author = {
  title: string;
  $: AdditionalParam;
}

type Blog = {
  url: string;
  body: string;
  title: string;
  $: AdditionalParam;
}

export type Posts = {
  heading: any;
  characters: any;
  modular_blocks: any;
  locale: string;
  author: [Author];
  body: string;
  date: string;
  featured_image: {};
  is_archived: boolean;
  related_post: [Blog];
  seo: {};
  url:string;
  title: string;
  _owner: {}
}


export type HeaderProps = {
  locale:string;
  logo: Image;
  navigation_menu:[List]
  notification_bar: Announcement;
  title: string;
  uid: string;
  social: Social;
  navigation: Navigation;
  copyright: string;
  $: AdditionalParam;
}

export type Entry = [
  entry: EntryData
]

type List = {
  label?: string;
  page_reference: [PageRef];
  $: {};
  href?: string;
}

export type NavLinks = {
  label?: string;
}

export type Links = {
  label?: string;
  title: string;
  href: string;
  $:AdditionalParam;
}

export type PageProps = {
  locale: string;
  page_components: Component[];
  uid: string;
  url: string;
  title: string;
  seo: {};
}

export type FooterProps = {
  logo: Image;
  title: string;
  social: Social;
  navigation: Navigation;
  copyright: string;
  locale: string, 
  navigation_menu: [List];
  notification_bar: Announcement; 
  uid: string;
  $: AdditionalParam;
}

export type ChilderenProps = {
  props: {};
  type: Function;
}
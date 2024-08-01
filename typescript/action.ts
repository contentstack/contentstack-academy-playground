type AdditionalParam = {
  url: string;
  title: {};
}

export type Action = {
    title: string;
    href: string;
    $: AdditionalParam;
  }

export type Image = {
    height: any;
    width: any;
    filename: string;
    url: string;
    $: AdditionalParam;
  }
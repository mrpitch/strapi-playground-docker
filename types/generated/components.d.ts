import type { Schema, Attribute } from '@strapi/strapi';

export interface BlocksAccordionItem extends Schema.Component {
  collectionName: 'components_blocks_accordion_items';
  info: {
    displayName: 'Accordion Item';
    description: '';
  };
  attributes: {
    Label: Attribute.String;
    Copy: Attribute.Blocks;
  };
}

export interface BlocksCta extends Schema.Component {
  collectionName: 'components_blocks_ctas';
  info: {
    displayName: 'Cta';
    icon: 'arrowRight';
    description: '';
  };
  attributes: {
    Label: Attribute.String;
    Href: Attribute.String;
    Type: Attribute.Enumeration<
      ['Primary Button', 'Secondary Button', 'Outline', 'Link']
    >;
    Icon: Attribute.Enumeration<['Icon 1', 'Icon 2', 'Icon 3']>;
  };
}

export interface BlocksLogo extends Schema.Component {
  collectionName: 'components_blocks_logos';
  info: {
    displayName: 'Logo';
  };
  attributes: {
    LogoImage: Attribute.Media;
    LogoText: Attribute.String;
  };
}

export interface BlocksNavItem extends Schema.Component {
  collectionName: 'components_layout_nav_items';
  info: {
    displayName: 'Nav Item';
    icon: 'arrowRight';
    description: '';
  };
  attributes: {
    Label: Attribute.String;
    Href: Attribute.String;
    isExternal: Attribute.Boolean & Attribute.DefaultTo<false>;
  };
}

export interface BlocksNavItemsList extends Schema.Component {
  collectionName: 'components_layout_nav_items_lists';
  info: {
    displayName: 'Nav Items List';
    description: '';
  };
  attributes: {
    Headline: Attribute.String;
    NavItem: Attribute.Component<'blocks.nav-item', true>;
  };
}

export interface BlocksSeo extends Schema.Component {
  collectionName: 'components_blocks_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
    description: '';
  };
  attributes: {
    metaTitle: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaDescription: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 50;
        maxLength: 160;
      }>;
    keywords: Attribute.Text;
    canonicalURL: Attribute.String;
  };
}

export interface LayoutAccordion extends Schema.Component {
  collectionName: 'components_layout_accordions';
  info: {
    displayName: 'Accordion';
    icon: 'layer';
    description: '';
  };
  attributes: {
    Headline: Attribute.String;
    AccordionItem: Attribute.Component<'blocks.accordion-item', true> &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
  };
}

export interface LayoutRichTextBlock extends Schema.Component {
  collectionName: 'components_layout_rich_text_blocks';
  info: {
    displayName: 'RichText Block';
    icon: 'file';
    description: '';
  };
  attributes: {
    Headline: Attribute.String;
    Subline: Attribute.String;
    Copy: Attribute.Blocks;
  };
}

export interface LayoutStage extends Schema.Component {
  collectionName: 'components_layout_stages';
  info: {
    displayName: 'Stage';
    icon: 'folder';
    description: '';
  };
  attributes: {
    Headline: Attribute.String;
    Subline: Attribute.String;
    Cta: Attribute.Component<'blocks.cta'>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'blocks.accordion-item': BlocksAccordionItem;
      'blocks.cta': BlocksCta;
      'blocks.logo': BlocksLogo;
      'blocks.nav-item': BlocksNavItem;
      'blocks.nav-items-list': BlocksNavItemsList;
      'blocks.seo': BlocksSeo;
      'layout.accordion': LayoutAccordion;
      'layout.rich-text-block': LayoutRichTextBlock;
      'layout.stage': LayoutStage;
    }
  }
}

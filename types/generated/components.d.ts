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

export interface BlocksButtonCard extends Schema.Component {
  collectionName: 'components_landing_page_button_cards';
  info: {
    displayName: 'Button Card';
    icon: 'arrowRight';
    description: '';
  };
  attributes: {
    Label: Attribute.String;
    Url: Attribute.String;
    Icon: Attribute.Enumeration<['Icon 1', 'Icon 2', 'Icon 3']>;
  };
}

export interface BlocksContentCard extends Schema.Component {
  collectionName: 'components_landing_page_content_cards';
  info: {
    displayName: 'Content Card';
    icon: 'layout';
    description: '';
  };
  attributes: {
    Headline: Attribute.String;
    Copy: Attribute.Text;
    Icon: Attribute.Enumeration<['Icon 1', 'Icon 2', 'Icon 3']>;
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

export interface BlocksIcons extends Schema.Component {
  collectionName: 'components_atoms_icons';
  info: {
    displayName: 'Icons';
    icon: 'brush';
    description: '';
  };
  attributes: {
    Label: Attribute.String;
    Slug: Attribute.String;
    SVG: Attribute.Media;
    Direction: Attribute.Enumeration<['default', 'before', 'after']> &
      Attribute.DefaultTo<'default'>;
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

export interface LayoutButtonTeaser extends Schema.Component {
  collectionName: 'components_layout_button_teasers';
  info: {
    displayName: 'Button Teaser';
    icon: 'apps';
  };
  attributes: {
    Headline: Attribute.String;
    Subline: Attribute.String;
    ButtonCard: Attribute.Component<'blocks.button-card', true>;
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

export interface LayoutServiceTeaser extends Schema.Component {
  collectionName: 'components_layout_service_teasers';
  info: {
    displayName: 'Service Teaser';
    icon: 'apps';
    description: '';
  };
  attributes: {
    Headline: Attribute.String;
    Subline: Attribute.String;
    ContentCard: Attribute.Component<'blocks.content-card', true>;
    service: Attribute.Relation<
      'layout.service-teaser',
      'oneToOne',
      'api::service.service'
    >;
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
      'blocks.button-card': BlocksButtonCard;
      'blocks.content-card': BlocksContentCard;
      'blocks.cta': BlocksCta;
      'blocks.icons': BlocksIcons;
      'blocks.logo': BlocksLogo;
      'blocks.nav-item': BlocksNavItem;
      'blocks.nav-items-list': BlocksNavItemsList;
      'blocks.seo': BlocksSeo;
      'layout.accordion': LayoutAccordion;
      'layout.button-teaser': LayoutButtonTeaser;
      'layout.rich-text-block': LayoutRichTextBlock;
      'layout.service-teaser': LayoutServiceTeaser;
      'layout.stage': LayoutStage;
    }
  }
}

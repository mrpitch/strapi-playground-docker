import type { Schema, Attribute } from '@strapi/strapi';

export interface BlocksButtonCards extends Schema.Component {
  collectionName: 'components_landing_page_button_cards';
  info: {
    displayName: 'Button Card';
    icon: 'arrowRight';
    description: '';
  };
  attributes: {
    Label: Attribute.String;
    Icon: Attribute.Component<'blocks.icons'>;
    Url: Attribute.String;
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
    Icon: Attribute.Component<'blocks.icons'>;
    Copy: Attribute.Text;
  };
}

export interface BlocksCta extends Schema.Component {
  collectionName: 'components_blocks_ctas';
  info: {
    displayName: 'Cta';
    icon: 'arrowRight';
  };
  attributes: {
    Label: Attribute.String;
    Href: Attribute.String;
    Type: Attribute.Enumeration<
      ['Primary Button', 'Secondary Button', 'Outline', 'Link']
    >;
    Icon: Attribute.Component<'blocks.icons'>;
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

export interface LandingPageButtonTeaser extends Schema.Component {
  collectionName: 'components_landing_page_button_teasers';
  info: {
    displayName: 'Button Teaser';
    icon: 'apps';
    description: '';
  };
  attributes: {
    Headline: Attribute.String;
    Subline: Attribute.String;
    ButtonCard: Attribute.Component<'blocks.button-cards', true>;
  };
}

export interface LandingPageGaSearch extends Schema.Component {
  collectionName: 'components_landing_page_ga_searches';
  info: {
    displayName: 'GA Search';
    icon: 'search';
  };
  attributes: {
    Headline: Attribute.String;
    Copy: Attribute.Text;
    Ctas: Attribute.Component<'blocks.cta', true>;
  };
}

export interface LandingPageStage extends Schema.Component {
  collectionName: 'components_landing_page_stages';
  info: {
    displayName: 'Stage';
    icon: 'landscape';
    description: '';
  };
  attributes: {
    Headline: Attribute.String;
    Subline: Attribute.String;
    Ctas: Attribute.Component<'blocks.cta', true>;
    BackgroundImage: Attribute.Media;
    Logo: Attribute.Media;
  };
}

export interface LandingPageTeaser extends Schema.Component {
  collectionName: 'components_landing_page_teasers';
  info: {
    displayName: 'Teaser';
    icon: 'dashboard';
  };
  attributes: {
    Headline: Attribute.String;
    ContentCard: Attribute.Component<'blocks.content-card', true>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'blocks.button-cards': BlocksButtonCards;
      'blocks.content-card': BlocksContentCard;
      'blocks.cta': BlocksCta;
      'blocks.icons': BlocksIcons;
      'landing-page.button-teaser': LandingPageButtonTeaser;
      'landing-page.ga-search': LandingPageGaSearch;
      'landing-page.stage': LandingPageStage;
      'landing-page.teaser': LandingPageTeaser;
    }
  }
}

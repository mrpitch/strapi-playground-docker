import type { Schema, Attribute } from '@strapi/strapi';

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
    Icon: Attribute.Component<'blocks.icons'>;
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
    Icons: Attribute.Component<'blocks.icons'>;
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

export interface SharedMetaSocial extends Schema.Component {
  collectionName: 'components_shared_meta_socials';
  info: {
    displayName: 'metaSocial';
    icon: 'project-diagram';
  };
  attributes: {
    socialNetwork: Attribute.Enumeration<['Facebook', 'Twitter']> &
      Attribute.Required;
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    description: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 65;
      }>;
    image: Attribute.Media;
  };
}

export interface SharedSeo extends Schema.Component {
  collectionName: 'components_shared_seos';
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
    metaImage: Attribute.Media;
    metaSocial: Attribute.Component<'shared.meta-social', true>;
    keywords: Attribute.Text;
    metaRobots: Attribute.String;
    structuredData: Attribute.JSON;
    metaViewport: Attribute.String;
    canonicalURL: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'blocks.button-card': BlocksButtonCard;
      'blocks.content-card': BlocksContentCard;
      'blocks.cta': BlocksCta;
      'blocks.icons': BlocksIcons;
      'layout.button-teaser': LayoutButtonTeaser;
      'layout.stage': LayoutStage;
      'shared.meta-social': SharedMetaSocial;
      'shared.seo': SharedSeo;
    }
  }
}

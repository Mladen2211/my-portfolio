import type { Schema, Struct } from '@strapi/strapi';

export interface SharedSkillItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_skill_items';
  info: {
    description: 'A single skill within a skill category';
    displayName: 'Skill Item';
    icon: 'bulletList';
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedTechnology extends Struct.ComponentSchema {
  collectionName: 'components_shared_technologies';
  info: {
    description: 'A technology tag';
    displayName: 'Technology';
    icon: 'code';
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.skill-item': SharedSkillItem;
      'shared.technology': SharedTechnology;
    }
  }
}

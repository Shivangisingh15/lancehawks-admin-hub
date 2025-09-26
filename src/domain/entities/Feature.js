//onboarding screen//
export class Feature {
  constructor({ id, icon, title, description, category }) {
    this.id = id;
    this.icon = icon;
    this.title = title;
    this.description = description;
    this.category = category;
  }

  isCore() {
    return this.category === 'core';
  }
}
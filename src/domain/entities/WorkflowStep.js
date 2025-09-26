//onboarding screen//
export class WorkflowStep {
  constructor({ id, step, title, description, icon, order }) {
    this.id = id;
    this.step = step;
    this.title = title;
    this.description = description;
    this.icon = icon;
    this.order = order;
  }

  getStepNumber() {
    return this.step.padStart(2, '0');
  }
}
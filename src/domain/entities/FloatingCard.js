//onboarding screen//
export class FloatingCard {
  constructor({ id, type, title, value, trend, data, items, count, avatars, icon, position }) {
    this.id = id;
    this.type = type;
    this.title = title;
    this.value = value;
    this.trend = trend;
    this.data = data;
    this.items = items;
    this.count = count;
    this.avatars = avatars;
    this.icon = icon;
    this.position = position;
  }

  isStatsType() {
    return this.type === 'stats';
  }

  isChartType() {
    return this.type === 'chart';
  }

  isAgendaType() {
    return this.type === 'agenda';
  }

  isTeamType() {
    return this.type === 'team';
  }
}

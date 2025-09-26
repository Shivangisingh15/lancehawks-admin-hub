//onboarding screen///
export class Testimonial {
  constructor({ id, name, role, avatar, testimonial, company, rating }) {
    this.id = id;
    this.name = name;
    this.role = role;
    this.avatar = avatar;
    this.testimonial = testimonial;
    this.company = company;
    this.rating = rating;
  }

  getFullStars() {
    return Array(this.rating).fill(true);
  }

  getInitials() {
    return this.name.split(' ').map(n => n[0]).join('');
  }
}

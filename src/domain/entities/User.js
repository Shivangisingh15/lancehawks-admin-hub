export class User {
  constructor({ 
    id, 
    email, 
    emailVerified = false, 
    profilePictureUrl = null, 
    role = 'user', 
    createdAt = null, 
    lastLogin = null,
    name = null 
  }) {
    this.id = id;
    this.email = email;
    this.emailVerified = emailVerified;
    this.profilePictureUrl = profilePictureUrl;
    this.role = role;
    this.createdAt = createdAt;
    this.lastLogin = lastLogin;
    this.name = name;
  }

  isAdmin() {
    return this.role === 'admin' || this.role === 'super_admin';
  }

  isEmailVerified() {
    return this.emailVerified;
  }

  getDisplayName() {
    if (this.name) {
      return this.name;
    }
    return this.email.split('@')[0];
  }

  getInitials() {
    if (this.name) {
      return this.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return this.email.charAt(0).toUpperCase();
  }

  getAvatarUrl() {
    return this.profilePictureUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(this.getDisplayName())}&background=7c3aed&color=fff&size=40`;
  }

  hasRole(role) {
    return this.role === role;
  }

  canAccessAdmin() {
    return this.isAdmin();
  }

  getLastLoginFormatted() {
    if (!this.lastLogin) return 'Never';
    
    try {
      return new Date(this.lastLogin).toLocaleDateString();
    } catch {
      return 'Unknown';
    }
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      emailVerified: this.emailVerified,
      profilePictureUrl: this.profilePictureUrl,
      role: this.role,
      createdAt: this.createdAt,
      lastLogin: this.lastLogin,
      name: this.name
    };
  }
}
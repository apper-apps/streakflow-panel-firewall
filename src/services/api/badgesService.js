import badgesData from "@/services/mockData/badges.json";

class BadgesService {
  constructor() {
    this.badges = [...badgesData];
    this.nextId = Math.max(...this.badges.map(b => b.Id)) + 1;
  }

  async getAll() {
    await this.delay(300);
    return [...this.badges];
  }

  async getById(id) {
    await this.delay(200);
    const badge = this.badges.find(b => b.Id === parseInt(id));
    if (!badge) {
      throw new Error(`Badge with Id ${id} not found`);
    }
    return { ...badge };
  }

  async create(badgeData) {
    await this.delay(350);
    const newBadge = {
      Id: this.nextId++,
      ...badgeData,
      earnedAt: badgeData.earnedAt || new Date().toISOString()
    };
    this.badges.push(newBadge);
    return { ...newBadge };
  }

  async update(id, badgeData) {
    await this.delay(250);
    const index = this.badges.findIndex(b => b.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Badge with Id ${id} not found`);
    }
    this.badges[index] = { ...this.badges[index], ...badgeData };
    return { ...this.badges[index] };
  }

  async delete(id) {
    await this.delay(200);
    const index = this.badges.findIndex(b => b.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Badge with Id ${id} not found`);
    }
    const deletedBadge = this.badges.splice(index, 1)[0];
    return { ...deletedBadge };
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default new BadgesService();
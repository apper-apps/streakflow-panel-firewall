import goalsData from "@/services/mockData/goals.json";

class GoalsService {
  constructor() {
    this.goals = [...goalsData];
    this.nextId = Math.max(...this.goals.map(g => g.Id)) + 1;
  }

  async getAll() {
    await this.delay(300);
    return [...this.goals];
  }

  async getById(id) {
    await this.delay(200);
    const goal = this.goals.find(g => g.Id === parseInt(id));
    if (!goal) {
      throw new Error(`Goal with Id ${id} not found`);
    }
    return { ...goal };
  }

  async create(goalData) {
    await this.delay(400);
    const newGoal = {
      Id: this.nextId++,
      ...goalData,
      createdAt: goalData.createdAt || new Date().toISOString(),
      isArchived: false,
      currentStreak: 0,
      bestStreak: 0,
      lastCompletedDate: null
    };
    this.goals.push(newGoal);
    return { ...newGoal };
  }

  async update(id, goalData) {
    await this.delay(300);
    const index = this.goals.findIndex(g => g.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Goal with Id ${id} not found`);
    }
    this.goals[index] = { ...this.goals[index], ...goalData };
    return { ...this.goals[index] };
  }

  async delete(id) {
    await this.delay(250);
    const index = this.goals.findIndex(g => g.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Goal with Id ${id} not found`);
    }
    const deletedGoal = this.goals.splice(index, 1)[0];
    return { ...deletedGoal };
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default new GoalsService();
import completionsData from "@/services/mockData/completions.json";

class CompletionsService {
  constructor() {
    this.completions = [...completionsData];
    this.nextId = Math.max(...this.completions.map(c => c.Id)) + 1;
  }

  async getAll() {
    await this.delay(250);
    return [...this.completions];
  }

  async getById(id) {
    await this.delay(200);
    const completion = this.completions.find(c => c.Id === parseInt(id));
    if (!completion) {
      throw new Error(`Completion with Id ${id} not found`);
    }
    return { ...completion };
  }

  async create(completionData) {
    await this.delay(300);
    const newCompletion = {
      Id: this.nextId++,
      ...completionData,
      completedAt: completionData.completedAt || new Date().toISOString()
    };
    this.completions.push(newCompletion);
    return { ...newCompletion };
  }

  async update(id, completionData) {
    await this.delay(250);
    const index = this.completions.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Completion with Id ${id} not found`);
    }
    this.completions[index] = { ...this.completions[index], ...completionData };
    return { ...this.completions[index] };
  }

  async delete(id) {
    await this.delay(200);
    const index = this.completions.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Completion with Id ${id} not found`);
    }
    const deletedCompletion = this.completions.splice(index, 1)[0];
    return { ...deletedCompletion };
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default new CompletionsService();
interface Visa {
  id: number;
  userId: number;
  type: string;
  status: string;
  applicantName: string;
  passportNumber: string;
  createdAt: string;
}

export const storage = {
  getVisas(): Visa[] {
    const visas = localStorage.getItem('visas');
    return visas ? JSON.parse(visas) : [];
  },

  addVisa(visa: Omit<Visa, 'id' | 'createdAt'>): Visa {
    const visas = this.getVisas();
    const newVisa: Visa = {
      ...visa,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    visas.push(newVisa);
    localStorage.setItem('visas', JSON.stringify(visas));
    return newVisa;
  },

  getVisasByUserId(userId: number): Visa[] {
    return this.getVisas().filter(visa => visa.userId === userId);
  },

  updateVisa(id: number, updates: Partial<Visa>): boolean {
    const visas = this.getVisas();
    const index = visas.findIndex(visa => visa.id === id);
    if (index !== -1) {
      visas[index] = { ...visas[index], ...updates };
      localStorage.setItem('visas', JSON.stringify(visas));
      return true;
    }
    return false;
  },

  deleteVisa(id: number): boolean {
    const visas = this.getVisas();
    const filteredVisas = visas.filter(visa => visa.id !== id);
    if (filteredVisas.length !== visas.length) {
      localStorage.setItem('visas', JSON.stringify(filteredVisas));
      return true;
    }
    return false;
  }
};
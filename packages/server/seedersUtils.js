module.exports = {
  generateUniqueList(size, createElementCallback) {
    const result = new Set();
    let iteration = 0;

    while (result.size < size) {
      if (iteration > size * 5) {
        throw new Error(`Too many iterations were run to generate unique seed data.
        Make sure the create element callback has enough unique values to choose from.`);
      }

      iteration += 1;

      const element = createElementCallback(result.size);
      result.add(element);
    }

    return Array.from(result);
  },
};

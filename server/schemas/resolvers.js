const { User, Thought } = require('../models')

const resolvers = {
  Query: {
    thoughts: async (parent, { username }) => {
      const params = username ? { username }: { };
      return Thought.find(params).sort({ createAt: -1 });
    }
  }
};

module.exports = resolvers;
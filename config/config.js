const config = {
  development: {
    MONGO_URL:"mongodb+srv://harsh07bharvada:gelato%4007@crudmongodb-t7ak7.mongodb.net/movies-fynd?retryWrites=true&w=majority",
    port: process.env.PORT || 3000,
    saltingRounds: 10,
    jwtSecret:'kaboom'
  },

}

module.exports = config;

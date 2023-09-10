const data = [
  ["Easy", "#8BC34A", "2023-09-03 00:00:00", "2023-09-03 00:00:00"],
  ["Medium", "#FFC107", "2023-09-03 00:00:00", "2023-09-03 00:00:00"],
  ["Hard", "#F44336", "2023-09-03 00:00:00", "2023-09-03 00:00:00"],
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "levels",
      data.map((d) => ({
        name: d[0],
        color_code: d[1],
        created_at: d[2],
        updated_at: d[3],
      }))
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("levels", {});
  },
};

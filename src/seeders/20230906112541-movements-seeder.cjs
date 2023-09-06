const data = [
  [
    "push-up",
    "Great for building chest, shoulder, and tricep strength.",
    "2023-09-03 00:00:00",
    "2023-09-03 00:00:00",
  ],
  [
    "bodyweight-squats",
    "Target your legs and glutes.",
    "2023-09-03 00:00:00",
    "2023-09-03 00:00:00",
  ],
  [
    "lunges",
    "Work your legs and improve balance.",
    "2023-09-03 00:00:00",
    "2023-09-03 00:00:00",
  ],
  [
    "planks",
    "Strengthen your core muscles.",
    "2023-09-03 00:00:00",
    "2023-09-03 00:00:00",
  ],
  [
    "mountain-climbers",
    "Engage your core and improve cardiovascular fitness.",
    "2023-09-03 00:00:00",
    "2023-09-03 00:00:00",
  ],
  [
    "burpees",
    "A full-body exercise that combines a squat, push-up, and jump.",
    "2023-09-03 00:00:00",
    "2023-09-03 00:00:00",
  ],
  [
    "jumping-jacks",
    "Good for a quick cardiovascular workout.",
    "2023-09-03 00:00:00",
    "2023-09-03 00:00:00",
  ],
  [
    "high-knees",
    "Boost your heart rate and engage your leg muscles.",
    "2023-09-03 00:00:00",
    "2023-09-03 00:00:00",
  ],
  [
    "wall-sits",
    "Strengthen your leg muscles and endurance.",
    "2023-09-03 00:00:00",
    "2023-09-03 00:00:00",
  ],
  [
    "tricep-dips",
    "Use a sturdy surface like a chair to work your triceps.",
    "2023-09-03 00:00:00",
    "2023-09-03 00:00:00",
  ],
  [
    "superman",
    "Target your lower back and improve posture.",
    "2023-09-03 00:00:00",
    "2023-09-03 00:00:00",
  ],
  [
    "russian-twists",
    "Work your obliques and improve core stability.",
    "2023-09-03 00:00:00",
    "2023-09-03 00:00:00",
  ],
  [
    "bicycle-crunches",
    "Engage your abs and obliques.",
    "2023-09-03 00:00:00",
    "2023-09-03 00:00:00",
  ],
  [
    "glute-bridges",
    "Strengthen your glutes and lower back.",
    "2023-09-03 00:00:00",
    "2023-09-03 00:00:00",
  ],
  [
    "leg-raises:",
    "Focus on your lower abs.",
    "2023-09-03 00:00:00",
    "2023-09-03 00:00:00",
  ],
  [
    "side-planks",
    "Strengthen your obliques and improve lateral stability.",
    "2023-09-03 00:00:00",
    "2023-09-03 00:00:00",
  ],
  [
    "jump-squats",
    "Add explosiveness to your squat routine.",
    "2023-09-03 00:00:00",
    "2023-09-03 00:00:00",
  ],
  [
    "bear-crawls",
    "A full-body movement that also improves coordination.",
    "2023-09-03 00:00:00",
    "2023-09-03 00:00:00",
  ],
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "movements",
      data.map((d) => ({
        name: d[0],
        description: d[1],
        createdAt: d[2],
        updatedAt: d[3],
      }))
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("movements", {});
  },
};

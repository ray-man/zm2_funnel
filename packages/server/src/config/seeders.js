const features = [
  "knows how to dance",
  "makes good breakfast",
  "shiny",
  "does karaoke",
  "silent",
  "robust",
  "artsy",
  "very efficient",
  "AI",
  "unbreakable",
];

module.exports = {
  seedValue: 1337,
  features,
  seedRowCounts: {
    features: features.length,
    brands: 50,
    robots: 800,
    staffMembers: 100,
    maxFeaturesPerRobot: features.length,
    maxExpertsPerRobot: 3,
  },
};

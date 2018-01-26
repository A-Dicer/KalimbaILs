const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/kalimbaILsDB",
  {
    useMongoClient: true
  }
);

const levelSeed = [
        { levelid: 1, name: "NappyOwl", location: "UnderWorld", difficulty: "Easy", rank: 0, time: 180000, type: "Normal" },
        { levelid: 2, name: "LazyHound", location: "UnderWorld", difficulty: "Easy", rank: 1, time: 180000, type: "Normal" },
        { levelid: 3, name: "StranDog", location: "UnderWorld", difficulty: "Easy", rank: 0, time: 180000, type: "Normal" },
        { levelid: 4, name: "StaringCow", location: "UnderWorld", difficulty: "Easy", rank: 0, time: 180000, type: "Normal" },
        { levelid: 5, name: "Greenish Vireo", location: "UnderWorld", difficulty: "Easy", rank: 0, time: 180000, type: "Normal" },
        { levelid: 6, name: "BuckTeeth", location: "UnderWorld", difficulty: "Easy", rank: 0, time: 180000, type: "Normal" },
        { levelid: 7, name: "Reptilicus", location: "UnderWorld", difficulty: "Easy", rank: 1, time: 180000, type: "Normal" },
        { levelid: 8, name: "GrindingChief", location: "UnderWorld", difficulty: "Easy", rank: 1, time: 180000 , type: "Boss" },

        { levelid: 9, name: "GrizzlyRodent", location: "MiddleWorld", difficulty: "Easy", rank: 1, time: 180000, type: "Normal" },
        { levelid: 10, name: "SankyFace", location: "MiddleWorld", difficulty: "Easy", rank: 1, time: 180000, type: "Normal" },
        { levelid: 11, name: "SnaglePuff", location: "MiddleWorld", difficulty: "Easy", rank: 1, time: 180000, type: "Normal" },
        { levelid: 12, name: "Skully", location: "MiddleWorld", difficulty: "Easy", rank: 1, time: 180000, type: "Normal" },
        { levelid: 13, name: "GrimeyGator", location: "MiddleWorld", difficulty: "Medium", rank: 1.5, time: 300000, type: "Normal" },
        { levelid: 14, name: "MusyCyclops", location: "MiddleWorld", difficulty: "Medium", rank: 1.5, time: 300000, type: "Normal" },
        { levelid: 15, name: "OwlBear", location: "MiddleWorld", difficulty: "Medium", rank: 2, time: 300000, type: "Normal" },
        { levelid: 16, name: "ZemiChief", location: "MiddleWorld", difficulty: "Easy", rank: 1, time: 180000, type: "Boss" },

        { levelid: 17, name: "DecafDogChild", location: "UpperWorld", difficulty: "Medium", rank: 2, time: 300000, type: "Normal" },
        { levelid: 18, name: "GravGaard", location: "UpperWorld", difficulty: "Medium", rank: 1.5, time: 300000, type: "Normal" },
        { levelid: 19, name: "KoalaKid", location: "UpperWorld", difficulty: "Medium", rank: 2, time: 300000, type: "Normal" },
        { levelid: 20, name: "TerraCotta", location: "UpperWorld", difficulty: "Hard", rank: 2.5, time: 1200, type: "Normal" },
        { levelid: 21, name: "SpiritualOoze", location: "UpperWorld", difficulty: "Medium", rank: 1.5, time: 300000, type: "Normal" },
        { levelid: 22, name: "Raymond", location: "UpperWorld", difficulty: "Medium", rank: 2, time: 300000, type: "Normal" },
        { levelid: 23, name: "SpikeyBrow", location: "UpperWorld", difficulty: "Medium", rank: 2, time: 300000, type: "Normal" },
        { levelid: 24, name: "JurakanChief", location: "UpperWorld", difficulty: "Medium", rank: 2, time: 300000, type: "Boss" },

        { levelid: 25, name: "Demongo", location: "DarkVoid", difficulty: "Medium", rank: 2, time: 300000, type: "Normal" },
        { levelid: 26, name: "KoolDoktor", location: "DarkVoid", difficulty: "Medium", rank: 2, time: 300000, type: "Normal" },
        { levelid: 27, name: "Slim", location: "DarkVoid", difficulty: "Medium", rank: 2, time: 300000, type: "Normal" },
        { levelid: 28, name: "SoSuMi", location: "DarkVoid", difficulty: "Medium", rank: 2, time: 300000, type: "Normal" },
        { levelid: 29, name: "SmokingRef", location: "DarkVoid", difficulty: "Hard", rank: 2.5, time: 420000, type: "Normal" },
        { levelid: 30, name: "Cyclops", location: "DarkVoid", difficulty: "Hard", rank: 3, time: 420000, type: "Normal" },
        { levelid: 31, name: "JusticeBearver", location: "DarkVoid", difficulty: "Hard", rank: 3, time: 420000, type: "Normal" },
        { levelid: 32, name: "Kuthulu", location: "DarkVoid", difficulty: "Hard", rank: 4, time: 420000, type: "Normal" },
        { levelid: 33, name: "Jamarly", location: "DarkVoid", difficulty: "Hard", rank: 3.5, time: 420000, type: "Normal" },
        { levelid: 34, name: "Illuminator", location: "DarkVoid", difficulty: "Hard", rank: 3, time: 420000, type: "Normal" },

        { levelid: 35, name: "SneakyRascal", location: "InnerWorld", difficulty: "Very Hard", rank: 5.5, time: 420000, type: "ShortHand" },
        { levelid: 36, name: "OculusMug", location: "InnerWorld", difficulty: "Very Hard", rank: 7, time: 600000, type: "ShortHand" },
        { levelid: 37, name: "Rosycheeks", location: "InnerWorld", difficulty: "Very Hard", rank: 7, time: 600000, type: "ShortHand" },
        { levelid: 38, name: "MoonLightBandit", location: "InnerWorld", difficulty: "Very Hard", rank: 7.5, time: 600000, type: "ShortHand" },
        { levelid: 39, name: "DopeyPeg", location: "InnerWorld", difficulty: "Very Hard", rank: 7, time: 600000, type: "ShortHand" },
        { levelid: 40, name: "SauceyBaboon", location: "InnerWorld", difficulty: "Very Hard", rank: 7.5, time: 600000, type: "ShortHand" },
        { levelid: 41, name: "SpunkyFangs", location: "InnerWorld", difficulty: "Very Hard", rank: 6.5, time: 420000, type: "ShortHand" },
        { levelid: 42, name: "MummyGreen", location: "InnerWorld", difficulty: "Very Hard", rank: 7, time: 600000, type: "ShortHand" },
        { levelid: 43, name: "Nurtle", location: "InnerWorld", difficulty: "Very Hard", rank: 7, time: 600000, type: "ShortHand" },
        { levelid: 44, name: "NarlyTwoFace", location: "InnerWorld", difficulty: "Very Hard", rank: 8, time: 600000, type: "ShortHand" },

        { levelid: 45, name: "Frogger", location: "InnerVoid", difficulty: "Very Hard", rank: 8, time: 600000, type: "ShortHand" },
        { levelid: 46, name: "Thumba", location: "InnerVoid", difficulty: "Very Hard", rank: 7, time: 600000, type: "ShortHand" },
        { levelid: 47, name: "PurpleSlander", location: "InnerVoid", difficulty: "Very Hard", rank: 6.5, time: 420000, type: "ShortHand" },
        { levelid: 48, name: "PierceParrot", location: "InnerVoid", difficulty: "Very Hard", rank: 7, time: 600000, type: "ShortHand" },
        { levelid: 49, name: "KaleidoFace", location: "InnerVoid", difficulty: "Very Hard", rank: 7, time: 600000, type: "ShortHand" },
        { levelid: 50, name: "Dario", location: "InnerVoid", difficulty: "Very Hard", rank: 7.5, time: 600000, type: "ShortHand" },
        { levelid: 51, name: "DJ SteelFace", location: "InnerVoid", difficulty: "Very Hard", rank: 6.5, time: 600000, type: "ShortHand" },
        { levelid: 52, name: "JeffMoldblum", location: "InnerVoid", difficulty: "Very Hard", rank: 8, time: 600000, type: "ShortHand" },
        { levelid: 53, name: "CrustyMouth", location: "InnerVoid", difficulty: "Very Hard", rank: 7, time: 600000, type: "ShortHand" },
        { levelid: 54, name: "Lemmy", location: "InnerVoid", difficulty: "Very Hard", rank: 7.5, time: 600000, type: "ShortHand" }
];

db.levels
  .remove({})
  .then(() => db.levels.collection.insertMany(levelSeed))
  .then(data => {
    console.log(data.insertedIds.length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

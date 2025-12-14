export default {
  locations: [
    {
      name: "AC2",
      type: "house",
      nether: [-611, -778]
    },
    {
      name: "Acacia",
      type: "house",
      nether: [-160, -168],
      images: ["acacia01.png", "acacia02.png", "acacia03.png"]
    },
    {
      name: "Casey's House",
      type: "house",
      nether: [38, -39],
    },
    {
      name: "Coal Mine",
      type: "house",
      nether: [-587, -740]
    },
    {
      name: "Dale's Vale",
      type: "house",
      nether: [-606, 195]
    },
    {
      name: "Dorginton",
      type: "campground",
      nether: [-299, -234],
    },
    {
      name: "End Portal",
      type: "chess-rook",
      nether: [-181, 120],
      images: ["stronghold01.png", "stronghold02.png", "stronghold03.png", "stronghold04.png"]
    },
    {
      name: "Flower Mine",
      type: "seedling",
      nether: [-611, -333],
    },
    {
      name: "Ice Base/AC6",
      type: "house",
      nether: [-904, -351]
    },
    {
      name: "Ice Spikes",
      type: "icicles",
      nether: [-611, 340],
    },
    {
      name: "Jungle",
      type: "spider",
      nether: [-347, -333],
    },
    {
      name: "Library",
      type: "house",
      overworld: [-4596, 1702]
    },
    {
      name: "Mangrove",
      type: "frog",
      nether: [-509, -113]
    },
    {
      name: "Mansion 1",
      type: "hotel",
      nether: [1204, 953],
    },
    {
      name: "Michelle",
      type: "campground",
      nether: [-17, -168],
      images: ["michelle01.png", "michelle02.png", "michelle03.png"]
    },
    {
      name: "Sunflower",
      type: "sun-plant-wilt",
      nether: [-360, -656],
    },
    {
      name: "Trials 1",
      type: "house",
      overworld: [-3244, -858]
    },
    {
      name: "Two Castles",
      type: "fort-awesome",
      nether: [-160, 953],
    },
    {
      name: "The Wilde",
      type: "house",
      nether: [2568, 189]
    }
  ],

  paths: [
    ["Acacia", -160, -333, "Jungle"],
    ["Acacia", -299, -168, "Dorginton"],
    ["Acacia", "Two Castles"],
    ["Casey's House", 38, -168, "Michelle"],
    ["Casey's House", -181, -39, "End Portal"],
    [-587, -337, "Coal Mine", -587, -778, "AC2"],
    ["Dale's Vale", "The Wilde"],
    ["Flower Mine", "Ice Spikes"],
    ["Flower Mine", -904, -333, "Ice Base/AC6"],
    ["Jungle", -347, -623, -360, -623, "Sunflower"],
    ["Jungle", "Flower Mine"],
    [-611, -113, "Mangrove"],
    ["Michelle", "Acacia"],
    ["Two Castles", "Mansion 1"],
  ]
}
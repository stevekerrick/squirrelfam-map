export default {
  locations: [
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
      name: "Two Castles",
      type: "fort-awesome",
      nether: [-160, 953],
    },
  ],

  paths: [
    ["Acacia", -160, -333, "Jungle"],
    ["Jungle", -347, -623, -360, -623, "Sunflower"],
    ["Jungle", "Flower Mine"],
    ["Flower Mine", "Ice Spikes"],
    [-611, -113, "Mangrove"],
    ["Casey's House", 38, -168, "Michelle"],
    ["Michelle", "Acacia"],
    ["Acacia", -299, -168, "Dorginton"],
    ["Acacia", "Two Castles"],
    ["Two Castles", "Mansion 1"],
    ["Casey's House", -181, -39, "End Portal"]
  ]
}
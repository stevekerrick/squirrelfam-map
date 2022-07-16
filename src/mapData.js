export default {
  locations: [
    {
      name: "Acacia",
      type: "home",
      nether: [-160, 59, -168],
      images: ["acacia01.png", "acacia02.png", "acacia03.png"]
    },
    {
      name: "Jungle",
      type: "portal",
      nether: [-347, 62, -333],
    },
    {
      name: "Sunflower",
      type: "portal",
      nether: [-360, 64, -656],
    },
    {
      name: "Flower Mine",
      type: "portal",
      nether: [-611, 62, -339],
    },
    {
      name: "Ice Spikes",
      type: "portal",
      nether: [-613, 73, 340],
    },
    {
      name: "Casey's House",
      type: "home",
      nether: [38, 68, -39],
    },
    {
      name: "Michelle's",
      type: "village",
      nether: [-17, 60, -168],
      images: ["michelle01.png", "michelle02.png", "michelle03.png"]
    },
    {
      name: "Dorginton",
      type: "village",
      nether: [-299, 90, -234],
    },
    {
      name: "Two Castles",
      type: "portal",
      nether: [-160, 59, 953],
    },
    {
      name: "Mansion 1",
      type: "portal",
      nether: [1204, 59, 953],
    },
    {
      name: "Stronghold",
      type: "stronghold",
      nether: [-181, 70, 120],
      images: ["stronghold01.png", "stronghold02.png", "stronghold03.png", "stronghold04.png"]
    },
    {
      name: "Mangrove",
      type: "point",
      overworld: [-4075, 64, -905]
    }
  ],

  paths: [
    // Acacia to Jungle
    [-160, -168, -160, -333, -347, -333],
    // Jungle to Sunflower
    [-347, -333, -347, -623, -360, -623, -360, -656],
    // Jungle to Flower Mine
    [-347, -337, -611, -337],
    // Flower Mine to Ice Spikes
    [-612, -339, -612, 340],
    // Casey to Michelle
    [38, -39, 38, -168, -17, -168],
    // Michelle to Acacia
    [-17, -168, -160, -168],
    // Acacia to Dorginton
    [-160, -168, -299, -168, -299, -234],
    // Acacia to Two Castles
    [-160, -168, -160, 953],
    // Two Castles to Mansion 1
    [-160, 953, 1204, 953],
    // Casey to Stronghold
    [38, -39, -181, -39, -181, 120]
  ]
}
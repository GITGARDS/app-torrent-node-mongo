if (process.env.NODE_ENV === "production") {
  module.exports = {
    mongoURI:
      "mongodb+srv://root:root@app-torrent-node-mongo.sucixxk.mongodb.net/app-torrent-node-mongo",
  };
} else {
  module.exports = {
    mongoURI:
      "mongodb+srv://root:root@app-torrent-node-mongo.sucixxk.mongodb.net/app-torrent-node-mongo",
  };
}

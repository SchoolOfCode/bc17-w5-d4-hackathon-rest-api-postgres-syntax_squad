// Import the required modules
import express from "express";
// import { getArtist } from "./artist";

// Import your helper functions for your first resource here
import {
  getArtist,
  getArtistById,
  createArtist,
  updateArtistById,
  deleteArtistById,
} from "./artist.js";

// Import your helper functions for your second resource here
// import {
//   getAlbum,
//   getAlbumById,
//   createAlbum,
//   updateAlbumById,
//   deleteAlbumById,
// } from "./album.js";

// Initialize the express app
const app = express();
// Retrieve the port number from environment variables
const PORT = process.env.PORT;

app.use(express.json()); // express.json() middleware is used to parse incoming JSON requests

// Resource One Route Handlers

// Endpoint to retrieve all artists
app.get("/artists/", async function (req, res) {
  const artist = await getArtist();
  res.status(200).json({ status: "success", data: artist });
});

// Endpoint to retrieve a artist by id
app.get("/artists/:id", async function (req, res) {
  const id = req.params.id;
  const artist = await getArtistById(id);
  // Assume 404 status if the artist is not found
  if (!artist) {
    return res
      .status(404)
      .json({ status: "fail", data: { message: "Artist not found" } });
  }
  res.status(200).json({ status: "success", data: artist });
});

// Endpoint to create a new artist
app.post("/artists/", async function (req, res) {
  try {
    const data = req.body;
    const artist = await createArtist(data);
    res.status(201).json({ status: "success", data: artist });
  } catch (err) {
    res.status(404).json({
      success: false,
      payload: {
        error: "That is an invalid input, please enter the Artist name",
      },
    });
  }
});

// Endpoint to update a specific artist by id
app.patch("/artists/:id", async function (req, res) {});

// Endpoint to delete a specific artist by id
app.delete("/artists/:id", async function (req, res) {});

// Resource Two Route Handlers

// Endpoint to retrieve all album
app.get("/albums/", async function (req, res) {
  res.status(200).json({ status: "success", data: authors });
});

// Endpoint to retrieve a album by id
app.get("/albums/:id", async function (req, res) {});

// Endpoint to create a new album
app.post("/albums/", async function (req, res) {});

// Endpoint to update a specific album by id
app.patch("/albums/:id", async function (req, res) {});

// Endpoint to delete a specific album by id
app.delete("/albums/:id", async function (req, res) {});

// Start the server and listen on the specified port
app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`);
});

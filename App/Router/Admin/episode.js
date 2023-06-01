const { EpisodeController } = require("../../Http/Controllers/Admin/Course/episode.Controller");
const { uploadVideo } = require("../../Utils/multer");

const router = require("express").Router();
    router.post("/add", uploadVideo.single("video"), EpisodeController.addNewEpisode);
    router.delete("/remove/:episodeId", EpisodeController.removeEpisodeById);
    router.patch("/update/:episodeId", uploadVideo.single("video"), EpisodeController.updateEpisodeById);
module.exports ={ 
    AdminApiEpisodeRoutes: router
}
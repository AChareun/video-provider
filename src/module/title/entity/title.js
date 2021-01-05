module.exports = class Title {
    /**
     * @param { number } id
     * @param { string } name
     * @param { string } synopsis
     * @param { number } episodeCount
     * @param { number } seasonCount
     * @param { string } sourceImage
     * @param { Date } premiereDate
     * @param { string } trailerUrl
     */
    constructor(
        id,
        name,
        synopsis,
        episodeCount,
        seasonCount,
        sourceImage,
        premiereDate,
        trailerUrl,
    ) {
        this.id = id;
        this.name = name;
        this.synopsis = synopsis;
        this.episodeCount = episodeCount;
        this.seasonCount = seasonCount;
        this.sourceImage = sourceImage;
        this.premiereDate = premiereDate;
        this.trailerUrl = trailerUrl;
    }
};

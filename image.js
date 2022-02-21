class Image {
    /*
        A class used specifically to decompose image.js images, apply kmeans to them, and then manipulate and export them
    */
    image;
    height = 0;
    width = 0;
    pixels = [];
    clusterColors = [];
    newColors = []
    constructor(image, numClusters = 0) {
        if(image)
            this.import(image);
        if(numClusters)
            this.cluster(numClusters);
    }
    cluster(k) {
        // cluster using kmeans and store
        this.kmeans = kmeans(this.pixels, k);
        this.clusterColors = this.newColors = this.kmeans.centroids;
    }
    import(image){
        // after this function this image can be manipulated, the original pixel data is stored in this.pixels
        this.image = image
        this.height = this.image.height;
        this.width = this.image.width;
        let rawRGB = this.image.getRGBAData();
        // loop through the pixels, which are listed in [r,g,b,a] repeatedly and sort into rgb pixel vectors
        for (let column = 0; column < this.width * this.height; ++column) {
            
            this.pixels.push([rawRGB[4 * column], rawRGB[4 * column + 1], rawRGB[4 * column + 2]])
            
        }
    }
    export(){
        // create new image based on cluster

        // go through each of the centroids
        for (let c = 0; c < this.kmeans.clusters.length; ++c) {
            // go through each point assigned to each centroid
            for (let i = 0; i < this.kmeans.clusters[c].points.length; ++i) {
                this.image.setPixel(this.kmeans.clusters[c].points[i], [this.newColors[c][0],
                    this.newColors[c][1], this.newColors[c][2], 255
                ]);
            }

        }
        return this.image;
    }
}
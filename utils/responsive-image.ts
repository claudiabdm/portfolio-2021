class ResponsiveImage {
    createSrcset(
        image: string,
        imageOptions: string,
        sizeList: number[] = [320, 640]
    ): string[] {
        const srcset = [];
        for (const size of sizeList) {
            const src = this.createSrc(image, `${size}x0/${imageOptions}`);
            srcset.push(`${src} ${size}w`);
        }
        return srcset;
    }

    createSrc(image: string, imageOptions: string): string {
        const path = `${image}/m/${imageOptions}`;
        return path || '';
    }
}

const responsiveImg = new ResponsiveImage();

export { responsiveImg };
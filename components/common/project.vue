<template>
    <div :style="getMainStyles()">
        <div class="heading-3">{{ title }}</div>
        <div :style="getImgFrameStyles()">
            <img :src="imageSrc" :alt="imageDesc">
        </div>
        <div class="info body-m">
            <span>{{ name }}</span>
            <span>{{ type }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        imageSrc: {
            type: String,
            required: true,
        },
        imageDesc: {
            type: String,
            default: 'Project image',
        },
        position: {
            type: String,
            default: 'start',
            validator: value => ['start', 'end'].includes(value),
        },
        imgWidth: {
            type: String,
            default: 'auto',
        },
        imgHeight: {
            type: String,
            default: 'auto',
        },
    },
    methods: {
        getMainStyles() {
            return {
                display: 'inline-block',
                alignSelf: `flex-${this.position}`,
            };
        },
        getImgFrameStyles() {
            return {
                width: this.imgWidth,
                height: this.imgHeight,
            };
        },
    },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/style";

img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.info {
    display: flex;
    justify-content: space-between;
}
</style>
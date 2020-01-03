<template>
    <div class="about" @click="show=true">
        <Overlay :show="show" @click.stop="show=false">
            <Swipe
                :autoplay="3000"
                :duration="1000"
            >
                <SwipeItem
                    v-for="(image, index) in images"
                    :key="index"
                >
                    {{ image }}
                </SwipeItem>
            </Swipe>
        </Overlay>

    </div>
</template>
<script>
    import { Overlay, SwipeItem, Swipe } from 'vant'

    export default {
        data() {
            return {
                images: [1, 2, 3, 4, 5],
                show:false
            }
        },
        components: {
            SwipeItem, Swipe,
            Overlay,
        },
    }
</script>
<style>
    .about {
        height: 100%;
    }
</style>

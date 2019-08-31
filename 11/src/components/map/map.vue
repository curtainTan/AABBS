<template>
    <div class="map">
        <h2>百度地图</h2>
        <baidu-map class="bm-view" ak="2ZMcgYgarHDmUS5bzdebLZBMcrEIoQ8X"
        :center="center" :zoom="zoom" @ready="handler"
        :scroll-wheel-zoom="true"
        >
            <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
            <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
            <bm-view class="mapview"></bm-view>
            <bm-local-search class="searchRes" :keyword="keyword" :auto-viewport="true" :location="location"></bm-local-search>
        </baidu-map>
        <div class="search">
            <label>关键词：<Input v-model="keyword" placeholder="关键词..." style="width: 300px" /></label>
            <label>地区：<Input v-model="location" placeholder="地区..." style="width: 300px" /></label>
        </div>
    </div>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import { BmGeolocation, BmScale, BmView, BmLocalSearch } from 'vue-baidu-map'

export default {
    components: {
        BaiduMap,
        BmGeolocation,
        BmScale,
        BmView,
        BmLocalSearch
    },
    data () {
        return {
            center: {lng: 0, lat: 0},
            zoom: 15,
            keyword: "",
            location : "",
            location : "北京"
        }
    },
    methods: {
        handler ({BMap, map}) {
            console.log(BMap, map)
            this.center.lng = 116.404
            this.center.lat = 39.915
            this.zoom = 15
        }
    }
}
</script>

<style scoped>
.map{
    padding: 20px;
}
.bm-view{
    margin: 20px 0px;
    width: 100%;
    height: 300px;
}
.mapview{
    height: 300px;
}
.searchRes{
    margin-top: 70px;
    height: 200px;
    overflow: auto;
}
</style>

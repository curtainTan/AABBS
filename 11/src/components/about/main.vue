<template>
    <div class="main">
        <h1>
            上传七牛云
        </h1>
        <input id="file" type="file">
        <Button @click="upload" >提交</Button>
    </div>
</template>

<script>
import axios from 'axios'
const axiosinst = axios.create({})

export default {
    data(){
        return {
        }
    },
    methods: {
        upload(){
            var file = document.getElementById('file').files[0]
            console.log( file )

            this.$api.article.gettoken().then( res => {
                console.log( res )



                var rendera = new FileReader()
                var imgbase=''
                rendera.onload = ( ev ) => {
                    var ImgFileSize = ev.target.result.substring(ev.target.result.indexOf(",") + 1)
                    console.log('-----------base64-----------------')
                    console.log( ev.target.result )
                    // this.$api.article.asd( { dat : ImgFileSize } ).then( res => {
                    //     console.log( res )
                    // } )
                    var ajaxo = new XMLHttpRequest()
                    ajaxo.onreadystatechange = function(){
                        if( ajaxo.readyState === 4 ){
                            console.log( ajaxo.responseText )
                        }
                    }
                    console.log('--------图片大小-------------' + file.size )
                    ajaxo.open("POST", "http://upload.qiniup.com/putb64/"+ file.size + "/" , true )
                    ajaxo.setRequestHeader("Content-Type", "application/octet-stream")
                    ajaxo.setRequestHeader("Authorization", "UpToken " + res.data.token )
                    console.log('------------发送请求-----------')
                    ajaxo.send( ImgFileSize )
                }
                imgbase = rendera.readAsDataURL( file )
            })
        }
    },
}

</script>

<style scoped>

</style>

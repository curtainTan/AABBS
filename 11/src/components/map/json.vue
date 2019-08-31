<template>
    <div class="json">
        <h2 class="json-h2">快速使用json说明</h2>
        <div class="json-introduce">
            <ol>
                <h3>以我的json为例：</h3>
                <li>
                    <h3>首先先写好整体的样式或了解大概的布局, 并用特定字符替代要显示的数据，如下：</h3>
                    <div class="img">
                        <img src="../../assets/json1.png" alt="" srcset="">
                    </div>
                </li>
                <li>
                    <h3>将页面架构出来，并调好css，如下：</h3>
                    <div class="img">
                        <img src="../../assets/json2.png" alt="" srcset="">
                    </div>
                </li>
                <li>
                    <h3>在底部创建一个盒子css设置display为none，将写好的架构剥离出来放入盒子</h3>
                    <div class="img">
                        <img src="../../assets/json3.png" alt="" srcset="">
                    </div>
                </li>
                <li>
                    <h3>通过js获取各个模板转为字符串，然后依次替换特殊字符，重复的地方用for循环替换即可，并将替换后的模板插入主框架中，即完成：</h3>
                    <div class="img">
                        <img src="../../assets/json4.png" alt="" srcset="">
                    </div>
                </li>
            </ol>
        </div>
        <hr>
        <div class="asd" ref="asd">
            <div class="title">
                <a href="https://lol.qq.com/data/info-defail.shtml?id=MissFortune">点击直达官方网页</a>
                <span>赏金猎人</span>
                <span>厄运小姐</span>
            </div>
            <div class="about">
                
            </div>
            <div class="history">
                
            </div>
            <div class="skill">
                <h2>技能介绍</h2>
                
            </div>
            <div class="zhuangbei">
                <h2>推荐装备</h2>
                
            </div>
        </div>
        <div class="modal" ref="modal">
            <!-- main-modal -->
            <div class="template-main">
                <div class="mask"></div>
                <div class="introuduce">
                    <h4>${nickname}</h4>
                    <h1>${name}</h1>
                    <p><span class="work" >射手</span></p>
                    <p><span>物理攻击</span>   ${}</p>
                    <p><span>魔法攻击</span>   ${}</p>
                    <p><span>防御能力</span>   ${}</p>
                    <p><span>上手难度</span>   ${}</p>
                    <div class="down">
                        <button>购买英雄</button>
                    </div>
                </div>
                <div class="bgm">
                    <img src="" alt="">
                </div>
            </div>

            <!-- 背景故事模板 -->
            <div class="template-history">
                <h2>背景故事</h2>
                <div class="story">
                    <p>${story}</p>
                </div>
            </div>
            
            <!-- 模板 -->
            <div class="template-skill">
                <div class="img"><img src="" alt="" ></div>
                <div class="skill-about">
                    <h3>${skillName}</h3>
                    <p>${skillOne}</p>
                    <p>${skillTwo}</p>
                </div>
            </div>
            <!-- class改为template-equ-box -->
            <div class="template-equ">
                <div class="start">
                    <h4>${introduce}</h4>
                    <div class="content">

                    </div>
                </div>
            </div>
            <!-- class改为equ-conten -->
            <div class="equ-main">
                <div class="item">
                    <div class="item-top">
                        <img src="" alt="" >
                    </div>
                    <p>${equName}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    methods: {
        show( data ){
            var temMain = this.$refs.modal.getElementsByClassName('template-main')[0].innerHTML
            console.log( temMain )
            var story = this.$refs.modal.getElementsByClassName('template-history')[0].innerHTML
            var skill = this.$refs.modal.getElementsByClassName('template-skill')[0].innerHTML
            var equTemp = this.$refs.modal.getElementsByClassName('template-equ')[0].innerHTML
            var itemEqu = this.$refs.modal.getElementsByClassName('equ-main')[0].innerHTML

            var mainBox = this.$refs.asd.getElementsByClassName('about')[0]
            var storyBox = this.$refs.asd.getElementsByClassName('history')[0]
            var skillBox = this.$refs.asd.getElementsByClassName('skill')[0]
            var equBox = this.$refs.asd.getElementsByClassName('zhuangbei')[0]

            var templateString = ""

            templateString =  temMain.replace("${nickname}", data.nickName)
            .replace("${name}", data.name)
            .replace('src=""', 'src="'+ data.headImg +'"')
            .replace('${}', data.attr.物理攻击 )
            .replace('${}', data.attr.魔法攻击 )
            .replace('${}', data.attr.防御能力 )
            .replace('${}', data.attr.上手难度 )
            mainBox.innerHTML = templateString


            //替换故事
            templateString = story.replace( '${story}', data.story )
            storyBox.innerHTML = templateString


            //替换技能
            for( let i = 0; i < data.skill.length; i ++ ){
                templateString = skill.replace( 'src=""', 'src="'+ data.skill[i].image +'"' )
                .replace( '${skillName}', data.skill[i].name )
                .replace( '${skillOne}', data.skill[i].introduce)
                .replace( '${skillTwo}', data.skill[i].twointroduce)
                let ss = document.createElement('div')
                ss.classList.add('template')
                ss.innerHTML = templateString
                skillBox.appendChild( ss )
            }


            //替换装备
            for( let i = 0; i < data.equipment.length; i ++ ){
                templateString = equTemp.replace( "${introduce}", data.equipment[i].introduce )
                let ss = document.createElement('div')
                ss.innerHTML = templateString
                for( let j = 0; j < data.equipment[i].equ.length; j ++ ){
                    templateString = itemEqu.replace('${equName}', data.equipment[i].equ[j].name)
                    .replace( 'src=""', 'src="'+ data.equipment[i].equ[j].image +'"' )
                    var son = document.createElement('div')
                    son.classList.add('equ-item')
                    son.innerHTML = templateString
                    ss.appendChild( son )
                }
                equBox.appendChild( ss )
            }
        }
    },
    mounted() {
        var reqUrl = "https://curtaintan.github.io/tan/a.json"

        var asd = new XMLHttpRequest()
        asd.open( 'GET', reqUrl, true )
        asd.responseType = 'json'
        asd.send()
        asd.onload = () => {
            var res = asd.response
            console.log(res)
            this.show( res )
        }
    },
}
</script>

<style>
.json-h2{
    text-align: center;
}
.json{
    padding: 20px;
}
.json a{
    font-size: 18px;
    color: rgb(0, 0, 0);
    text-decoration: none;
    padding: 5px 8px;
    background-color: rgb(218, 230, 226);
    border-radius: 4px;
}
.json .title{
    margin: 40px auto;
    width: 360px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.json .title span{
    margin: 0px 20px;
}
.json .asd{
    max-width: 900px;
    margin: 10px auto;
}
.json .about{
    position: relative;
}
.json .about{
    color: #fff;
}
.json .about .introuduce{
    position: absolute;
    left: 60px;
    top: 70px;
}
.json .about img{
    width: 100%;
}
.json .about .introuduce p{
    margin: 10px 0px;
}
.json .about .introuduce p span{
    margin-right: 20px;
}
.json button{
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 10px 15px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 12px;
    margin: 4px 2px;
    cursor: pointer;
}
.json .about .mask{
    width: 200px;
    height: 100%;
    left: 0px;
    top: 0px;
    position: absolute;
    background-color: rgba(0, 0, 0, .5);
}
.json .work{
    padding: 4px 8px;
    border: 1px solid rgb(255, 126, 40);
    background: rgb(255, 126, 40);
    border-radius: 6px;
}
.json .history{
    margin: 20px 0px;
}
.json .template{
    display: flex;
    margin: 20px 0px;
}
.json .template .img{
    margin-right: 20px;
}
.json h2{
    font-size: 20px;
    margin: 10px 0px;
}
.json h4{
    margin: 8px 0px;
    font-size: 14px;
}
.json .template-skill,.json  .template-equ,.json  .equ-main,.json  .template-main,.json  .template-history{
    display: none;
}


.json .equ-item{
    display: inline-block;
    width: 140px;
    text-align: center;
}

.json-introduce .img img{
    width: 500px;
}
.json-introduce .img{
    text-align: center;
}
.json-introduce li{
    margin: 20px 0px;
}
.json-introduce li h3{
    margin: 20px 0px;
}
</style>

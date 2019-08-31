
import axios from '../http.js'
// import axios from 'axios'
//域名设置
// const host = 'http://localhost:3000/auth'

const host = 'https://www.curtaintan.club/auth'

const users = {
    //登录
    login( params ){
        return axios.post( `${host}/login`, params )
    },
    //注册
    register( params ){
        return axios.post( `${host}/register`, params )
    },
    //自动登录
    auto_login( params ){
        return axios.post( `${host}/autoLogin`, params )
    },
    //更新信息
    updata( params ){
        return axios.post( `${host}/updata`, params )
    },


    //设置背景图片
    setBg( params ){
        return axios.post( `${host}/setBg`, params )
    },
    //获取七牛云token
    getQnBg(  ){
        return axios.get( `${host}/QnSetBg` )
    },
    //设置七牛背景
    AfsetBg( params ){
        return axios.post( `${host}/QnAfSetBg`, params )
    } ,


    //获取头像token
    QnHeadImg(  ){
        return axios.get( `${host}/QnHeadImg` )
    },
    //设置七牛头像
    QnAfHeadImg( params ){
        return axios.post( `${host}/QnAfHeadImg`, params )
    } ,


    //设置默认背景图片
    setDefBg( params ){
        return axios.post( `${host}/setDefBg`, params )
    },
    //获取所有的喜欢
    getAllLike( params ){
        return axios.post( `${host}/getAllLike`, params )
    },
    //获取一个用户的基本信息
    getOne( params ){
        return axios.post( `${host}/getOne`, params )
    }
}




export default users



























var snow = {
    wrap : document.createElement('div'),
    allCount : 0,
    count : 0,
    offsetLeft : 1,
    startOffset : 0,
    width : document.body.clientWidth,
    createSnow : function(){
        var _this = this
        console.log( "snow" )
        setInterval( function(){
            var snowflake = document.createElement('div')
            var size = parseInt( Math.random() * 10 ) + 4

            snowflake.style.position = 'fixed'
            snowflake.style.top = -size + 'px'
            snowflake.style.left = parseInt( Math.random() * _this.width ) + _this.startOffset + 'px'
            snowflake.style.width = size + 'px'
            snowflake.style.height = size + 'px'
            snowflake.style.borderRadius = '50%'
            
            var r = parseInt( Math.round( Math.random() * 255 ))
            var g = parseInt( Math.round( Math.random() * 255 ))
            var b = parseInt( Math.round( Math.random() * 255 ))
            snowflake.style.backgroundColor = 'rgb(' + r +',' + g + ',' + b + ')'

            // snowflake.style.backgroundColor = "#fff"
            snowflake.style.zIndex = '99'
    
            _this.wrap.appendChild( snowflake )
            _this.allCount ++
            _this.move( snowflake, Math.random() * 1.5 - 1 )
            console.log( _this.allCount )
        }, parseInt( Math.random() * 200 ) + 500 )
    },
    move : function( ele, offset ){
        var _this = this
        var timer =  setInterval( function(){
            ele.style.top = parseFloat( ele.style.top ) +  parseInt( Math.random() * 1 + 1 )  + 'px'
            ele.style.left = parseFloat( ele.style.left ) + _this.offsetLeft + offset + 'px'

            if( parseInt( ele.style.top ) > (document.documentElement.clientHeight - parseInt( ele.style.height )) ){
                setTimeout( function(){
                    _this.allCount --
                    _this.wrap.removeChild( ele )
                }, 3000 )
                // if( _this.allCount > _this.count ){
                //     _this.wrap.removeChild( ele )
                //     _this.allCount --
                // }
                clearInterval( timer )
            }
        }, parseInt( Math.random() *15 + 15 ))
    },
    init : function( count ){
        var _this = this

        this.count = parseInt( count ) || 300

        document.body.appendChild( this.wrap )
        window.addEventListener( 'resize', function(){
            _this.width = document.body.clientWidth
        } )
        window.addEventListener( 'mousemove', function( e ){
            var xPos = e.clientX / _this.width
        
            _this.offsetLeft = ( xPos -0.5 ) * ( xPos > 0.3 && xPos < 0.7 ? 6 : 8 )
        
            if( xPos > 0.3 && xPos < 0.7 ){
                _this.startOffset = 0 
                return
            }else{
                _this.startOffset = xPos - 0.5 > 0 ? -_this.width * 0.4 : _this.width * 0.4
            }
        } )
        this.createSnow()
    }
}


export default snow


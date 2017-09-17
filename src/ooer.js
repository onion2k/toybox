
function effect(vs, fs) {

    var self = this;

    var init = function(width, height, canvas) {

        self.gl = window.twgl.getWebGLContext(canvas);

        self.programInfo = window.twgl.createProgramInfo(self.gl, [vs,fs]);

        var arrays = {
            position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
        };

        self.bufferInfo = window.twgl.createBufferInfoFromArrays(self.gl, arrays);


    }

    var render = function(time){

        window.twgl.resizeCanvasToDisplaySize(self.gl.canvas);

        self.gl.viewport(0, 0, self.gl.canvas.width, self.gl.canvas.height);

        var uniforms = {
            time: time * 0.001,
            mouse: [0., 0.],
            resolution: [self.gl.canvas.width, self.gl.canvas.height],
        };

        self.gl.useProgram(self.programInfo.program);

        window.twgl.setBuffersAndAttributes(self.gl, self.programInfo, self.bufferInfo);
        window.twgl.setUniforms(self.programInfo, uniforms);
        window.twgl.drawBufferInfo(self.gl, self.bufferInfo);

        requestAnimationFrame(render);

    }

    return { 
        init: init,
        render: render
    }

};

var canvas = document.getElementById("fx");
var width = canvas.width;
var height = canvas.height;

var bg = effect('vs','fs');

bg.init(width, height, canvas);
bg.render();





var palettes = [
    ['#e30049','#e00262','#d91d7a','#ce328f','#be43a2','#ab51b1','#965ebc','#7f68c3','#6670c5','#4d77c5','#357cc0','#2080ba','#1583b1','#1e85a7'],
    ['#568869','#5a825d','#5e7c51','#627646','#666f3c','#6a6833','#6e602c','#715927','#745124','#764923','#774023','#773826','#762f29','#74272d'],
    ['#137b3a','#07773e','#007342','#006f45','#006b47','#006649','#00624a','#005d4a','#08594a','#115449','#185048','#1e4b46','#234643','#274240'],
    ['#dbc0da','#cdb2ce','#c0a4c2','#b296b7','#a489ab','#967ca0','#886f95','#7a638a','#6d577f','#5f4b75','#513f6b','#443460','#362a56','#28204d'],
    ['#7194d4','#7b90d7','#888bd9','#9785d8','#a67fd5','#b677d0','#c56fc9','#d366bf','#e05cb3','#ec52a4','#f54894','#fc3f82','#ff396f','#ff365b'],
    ['#257baf','#307ab7','#4078be','#5275c3','#6672c6','#7a6dc7','#8e67c5','#a260c1','#b457ba','#c64db0','#d642a4','#e33696','#ef2886','#f71c74'],
    ['#f74f5f','#fb585b','#ff6056','#ff6952','#ff724e','#ff7b4a','#ff8446','#ff8d43','#ff9640','#ff9f3d','#ffa93b','#ffb23a','#ffbb3a','#ffc43b'],
    ['#a02b0d','#a7340d','#ad3d0d','#b4450d','#bb4e0d','#c1560d','#c75f0e','#cd670e','#d3700f','#d97810','#df8111','#e48a13','#e99315','#ee9b17'],
    ['#c967ff','#ae7bff','#8f8bff','#6a99ff','#39a4ff','#00afff','#00b8ff','#00bfff','#00c6ff','#00cdff','#00d2ff','#00d7ff','#00dbff','#39dffc']
];

var recolor = function() {

    var scale = palettes[Math.floor(Math.random() * palettes.length)];
    var deck = document.getElementsByTagName('a');
    var c = 0;
    for (var x =0; x < deck.length; x++) {
        deck[x].style.backgroundColor = scale[x];
    }

}

document.addEventListener("DOMContentLoaded", function(e) {

    recolor();

    var ui = document.querySelector('div.ui');
    var xPercent, yPercent;
    var limit = 3;

    ui.addEventListener('mousemove', function(e){

        xPercent = e.clientX / window.innerWidth * 100;
        yPercent = e.clientY / window.innerHeight * 100;
        ui.style['transform'] = 'rotateX('+ (limit - ((limit/50) * yPercent)) +'deg) rotateY('+ ((-1 * limit) + ((limit/50) * xPercent)) +'deg) rotateZ(0deg)';
    });
    
    var body = document.querySelector('body');

    body.addEventListener('mouseenter', function(e){

        ui.classList.remove('offline');

        recolor();

    });

    body.addEventListener('mouseleave', function(e){

        ui.style['transform'] = 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)';

        ui.classList.add('offline');

        var deck = document.getElementsByTagName('a');
        var c = 0;
        for (var x =0; x < deck.length; x++) {
            deck[x].style.backgroundColor = '#222';
        }

    });

    if (/Mobi/.test(navigator.userAgent)) {

        document.body.classList.remove('desktop');
        document.body.classList.add('mobile');

        var deck = document.getElementsByTagName('a');
        var c = 0;
        for (var x =0; x < deck.length; x++) {
            deck[x].addEventListener('click', function(e){
                e.preventDefault();
                var open = [].slice.call(document.querySelectorAll('.open'));
                if (open !== null) {
                    for (var o =0; o < open.length; o++) {
                        open[o].classList.remove('open');
                    }
                }
                this.classList.toggle('open');
            });
        }

    }

});

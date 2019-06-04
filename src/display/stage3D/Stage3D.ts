module rf{
    export class Stage3D extends Sprite{
        canvas: HTMLCanvasElement;

        names = [  "webgl", "experimental-webgl","webkit-3d", "moz-webgl"];
        requestContext3D(canvas: HTMLCanvasElement): boolean {
            this.canvas = canvas;
            let contextAttributes:any = {};
            if(isMobile){
                contextAttributes.antialias = false;
            }else{
                contextAttributes.antialias = true;
            }

            contextAttributes.stencil = false;
            contextAttributes.depth = true;

            let {names} = this;
            for (let i = 0; i < names.length; i++) {
                try {
                    gl = this.canvas.getContext(names[i],contextAttributes) as WebGLRenderingContext;
                } catch (e) {

                }
                if (gl) {
                    break;
                }
            }

            if (undefined == gl) {
                context3D = null;
                this.simpleDispatch(EventT.ERROR, "webgl is not available");
                return false;
            }

            context3D = singleton(Context3D);
            singleton(Mouse).init();

            // Capabilities.init();
            // mainKey.init();
            // KeyManagerV2.resetDefaultMainKey();

            this.simpleDispatch(EventT.CONTEXT3D_CREATE, gl);
            return true;
        }
    }
}
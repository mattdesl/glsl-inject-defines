//
/* block */

// stuff
   /*comment*/ #version 330 /* comment */

#extension GL_OES_standard_derivatives : enable
#define BOOL true
#define FOOBAR some string
#define BlendOverlayf(base, blend) (ops)
#define BlendOverlayf(base, blend) (base < 0.5 ? (2.0 * base * blend) : (1.0 - 2.0 * (1.0 - base) * (1.0 - blend)))

precision mediump float;
float f = 32.0;

varying vec2 vUv;
void main() {
}
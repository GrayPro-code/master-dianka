// light-rays.tsx
"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ogl_1 = require("ogl");
var react_1 = require("react");
var DEFAULT_COLOR = "#ffffff";
var hexToRgb = function (hex) {
    var m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return m ? [Number.parseInt(m[1], 16) / 255, Number.parseInt(m[2], 16) / 255, Number.parseInt(m[3], 16) / 255] : [1, 1, 1];
};
var getAnchorAndDir = function (origin, w, h) {
    var outside = 0.2;
    switch (origin) {
        case "top-left": return { anchor: [0, -outside * h], dir: [0, 1] };
        case "top-right": return { anchor: [w, -outside * h], dir: [0, 1] };
        case "left": return { anchor: [-outside * w, 0.5 * h], dir: [1, 0] };
        case "right": return { anchor: [(1 + outside) * w, 0.5 * h], dir: [-1, 0] };
        case "bottom-left": return { anchor: [0, (1 + outside) * h], dir: [0, -1] };
        case "bottom-center": return { anchor: [0.5 * w, (1 + outside) * h], dir: [0, -1] };
        case "bottom-right": return { anchor: [w, (1 + outside) * h], dir: [0, -1] };
        default: return { anchor: [0.5 * w, -outside * h], dir: [0, 1] };
    }
};
var LightRays = function (_a) {
    var _b = _a.raysOrigin, raysOrigin = _b === void 0 ? "top-center" : _b, _c = _a.raysColor, raysColor = _c === void 0 ? DEFAULT_COLOR : _c, _d = _a.raysSpeed, raysSpeed = _d === void 0 ? 1 : _d, _e = _a.lightSpread, lightSpread = _e === void 0 ? 1 : _e, _f = _a.rayLength, rayLength = _f === void 0 ? 2 : _f, _g = _a.pulsating, pulsating = _g === void 0 ? false : _g, _h = _a.fadeDistance, fadeDistance = _h === void 0 ? 1.0 : _h, _j = _a.saturation, saturation = _j === void 0 ? 1.0 : _j, _k = _a.mouseInfluence, mouseInfluence = _k === void 0 ? 0.1 : _k, _l = _a.noiseAmount, noiseAmount = _l === void 0 ? 0.0 : _l, _m = _a.distortion, distortion = _m === void 0 ? 0.0 : _m, _o = _a.className, className = _o === void 0 ? "" : _o, _p = _a.introAnimation, introAnimation = _p === void 0 ? true : _p, _q = _a.dynamicOrigin, dynamicOrigin = _q === void 0 ? null : _q;
    var containerRef = (0, react_1.useRef)(null);
    var uniformsRef = (0, react_1.useRef)(null);
    var rendererRef = (0, react_1.useRef)(null);
    var _r = (0, react_1.useState)(false), isVisible = _r[0], setIsVisible = _r[1];
    var observerRef = (0, react_1.useRef)(null);
    var dynamicOriginX = dynamicOrigin === null || dynamicOrigin === void 0 ? void 0 : dynamicOrigin.x;
    var dynamicOriginY = dynamicOrigin === null || dynamicOrigin === void 0 ? void 0 : dynamicOrigin.y;
    var updateDynamicRayOrigin = function () {
        if (!uniformsRef.current || !rendererRef.current || !dynamicOriginX || !dynamicOriginY)
            return;
        var dpr = rendererRef.current.dpr;
        uniformsRef.current.rayPos.value[0] = dynamicOriginX.get() * dpr;
        uniformsRef.current.rayPos.value[1] = dynamicOriginY.get() * dpr;
    };
    (0, react_1.useEffect)(function () {
        if (!containerRef.current)
            return;
        observerRef.current = new IntersectionObserver(function (entries) { return setIsVisible(entries[0].isIntersecting); }, { threshold: 0.1 });
        observerRef.current.observe(containerRef.current);
        return function () { var _a; return (_a = observerRef.current) === null || _a === void 0 ? void 0 : _a.disconnect(); };
    }, []);
    (0, react_1.useEffect)(function () {
        if (!isVisible || !containerRef.current)
            return;
        var cleanupFunction = null;
        var initializeWebGL = function () {
            if (!containerRef.current)
                return;
            var renderer = new ogl_1.Renderer({ dpr: Math.min(window.devicePixelRatio, 2), alpha: true });
            rendererRef.current = renderer;
            var gl = renderer.gl;
            gl.canvas.style.width = "100%";
            gl.canvas.style.height = "100%";
            containerRef.current.innerHTML = "";
            containerRef.current.appendChild(gl.canvas);
            var vert = "attribute vec2 position; varying vec2 vUv; void main() { vUv = position * 0.5 + 0.5; gl_Position = vec4(position, 0.0, 1.0); }";
            var frag = "precision highp float; uniform float iTime; uniform vec2 iResolution; uniform vec2 rayPos; uniform vec2 rayDir; uniform vec3 raysColor; uniform float raysSpeed; uniform float lightSpread; uniform float rayLength; uniform float pulsating; uniform float fadeDistance; uniform float saturation; uniform float mouseInfluence; uniform float noiseAmount; uniform float distortion; uniform float uIntro; varying vec2 vUv; float noise(vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123); } float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord, float seedA, float seedB, float speed) { vec2 sourceToCoord = coord - raySource; vec2 dirNorm = normalize(sourceToCoord); float cosAngle = dot(dirNorm, rayRefDirection); float distortedAngle = cosAngle; if (distortion > 0.0) { distortedAngle += distortion * sin(iTime * 2.0 + length(sourceToCoord) * 0.01) * 0.2; } float spreadFactor = pow(max(distortedAngle, 0.0), 1.8 / max(lightSpread, 0.001)); float distance = length(sourceToCoord); float maxDistance = iResolution.x * rayLength; float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0); float fadeFalloff = clamp((iResolution.x * fadeDistance - distance) / (iResolution.x * fadeDistance), 0.5, 1.0); float pulse = 1.0; if (pulsating > 0.5) { pulse = 0.9 + 0.1 * sin(iTime * speed); } \n      float baseStrength = 1.0;\n      return baseStrength * lengthFalloff * fadeFalloff * spreadFactor * pulse; } void mainImage(out vec4 fragColor, in vec2 fragCoord) { vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y); vec2 finalRayDir = rayDir; vec4 rays1 = vec4(1.0) * rayStrength(rayPos, finalRayDir, coord, 36.2214, 21.11349, 1.5 * raysSpeed); vec4 rays2 = vec4(1.0) * rayStrength(rayPos, finalRayDir, coord, 22.3991, 18.0234, 1.1 * raysSpeed); fragColor = rays1 * 1.0 + rays2 * 0.8; if (noiseAmount > 0.0) { float n = noise(coord * 0.01 + iTime * 0.1); fragColor.rgb *= (1.0 - noiseAmount + noiseAmount * n); } float brightness = smoothstep(0.0, 0.8, 1.0 - (coord.y / iResolution.y)); fragColor.rgb *= 0.5 + brightness * 0.5; if (saturation != 1.0) { float gray = dot(fragColor.rgb, vec3(0.299, 0.587, 0.114)); fragColor.rgb = mix(vec3(gray), fragColor.rgb, saturation); } fragColor.rgb *= raysColor; fragColor.a *= uIntro; } void main() { vec4 color; mainImage(color, gl_FragCoord.xy); gl_FragColor = color; }";
            var uniforms = { iTime: { value: 0 }, iResolution: { value: [1, 1] }, rayPos: { value: [0, 0] }, rayDir: { value: [0, 1] }, raysColor: { value: hexToRgb(raysColor) }, raysSpeed: { value: raysSpeed }, lightSpread: { value: lightSpread }, rayLength: { value: rayLength }, pulsating: { value: pulsating ? 1.0 : 0.0 }, fadeDistance: { value: fadeDistance }, saturation: { value: saturation }, mouseInfluence: { value: mouseInfluence }, noiseAmount: { value: noiseAmount }, distortion: { value: distortion }, uIntro: { value: introAnimation ? 0 : 1 }, };
            uniformsRef.current = uniforms;
            var geometry = new ogl_1.Triangle(gl);
            var program = new ogl_1.Program(gl, { vertex: vert, fragment: frag, uniforms: uniforms });
            var mesh = new ogl_1.Mesh(gl, { geometry: geometry, program: program });
            var updatePlacement = function () {
                if (!containerRef.current || !renderer)
                    return;
                renderer.dpr = Math.min(window.devicePixelRatio, 2);
                var _a = containerRef.current, wCSS = _a.clientWidth, hCSS = _a.clientHeight;
                renderer.setSize(wCSS, hCSS);
                var dpr = renderer.dpr;
                var w = wCSS * dpr;
                var h = hCSS * dpr;
                uniforms.iResolution.value = [w, h];
                if (!dynamicOrigin) {
                    var _b = getAnchorAndDir(raysOrigin, w, h), anchor = _b.anchor, dir = _b.dir;
                    uniforms.rayPos.value = anchor;
                    uniforms.rayDir.value = dir;
                }
                else {
                    updateDynamicRayOrigin();
                }
            };
            if (introAnimation) {
                var startTime_1 = null;
                var duration_1 = 2500;
                var animateIntro_1 = function (currentTime) {
                    if (startTime_1 === null)
                        startTime_1 = currentTime;
                    var progress = Math.min((currentTime - startTime_1) / duration_1, 1);
                    progress = 1 - Math.pow((1 - progress), 3);
                    if (uniformsRef.current)
                        uniformsRef.current.uIntro.value = progress;
                    if (progress < 1)
                        requestAnimationFrame(animateIntro_1);
                };
                requestAnimationFrame(animateIntro_1);
            }
            var animationId;
            var loop = function (t) {
                if (!uniformsRef.current)
                    return;
                uniformsRef.current.iTime.value = t * 0.001;
                renderer.render({ scene: mesh });
                animationId = requestAnimationFrame(loop);
            };
            window.addEventListener("resize", updatePlacement);
            updatePlacement();
            updateDynamicRayOrigin();
            animationId = requestAnimationFrame(loop);
            var unsubX = dynamicOriginX === null || dynamicOriginX === void 0 ? void 0 : dynamicOriginX.onChange(function () { return updateDynamicRayOrigin(); });
            var unsubY = dynamicOriginY === null || dynamicOriginY === void 0 ? void 0 : dynamicOriginY.onChange(function () { return updateDynamicRayOrigin(); });
            cleanupFunction = function () {
                var _a;
                cancelAnimationFrame(animationId);
                window.removeEventListener("resize", updatePlacement);
                unsubX === null || unsubX === void 0 ? void 0 : unsubX();
                unsubY === null || unsubY === void 0 ? void 0 : unsubY();
                (_a = renderer.gl.getExtension('WEBGL_lose_context')) === null || _a === void 0 ? void 0 : _a.loseContext();
            };
        };
        initializeWebGL();
        return function () { return cleanupFunction === null || cleanupFunction === void 0 ? void 0 : cleanupFunction(); };
    }, [isVisible, raysOrigin, raysColor, raysSpeed, lightSpread, rayLength, pulsating, fadeDistance, saturation, mouseInfluence, noiseAmount, distortion, introAnimation, dynamicOriginX, dynamicOriginY]);
    return <div ref={containerRef} className={"w-full h-full pointer-events-none z-[3] overflow-hidden relative ".concat(className).trim()}/>;
};
exports.default = LightRays;

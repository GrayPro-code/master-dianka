"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreeDCardHero = ThreeDCardHero;
var react_1 = require("react");
var image_1 = require("next/image");
var framer_motion_1 = require("framer-motion");
var _3d_card_1 = require("@/components/ui/3d-card");
var highlighted_text_1 = require("./highlighted-text");
var lamp_1 = require("@/components/lamp");
var solution_hero_background_1 = require("@/components/shared/solution-hero-background");
var use_gravity_effect_1 = require("@/hooks/use-gravity-effect");
var use_init_elastic_box_positions_1 = require("@/hooks/use-init-elastic-box-positions");
var use_mobile_1 = require("@/hooks/use-mobile");
var link_1 = require("next/link");
function ThreeDCardHero() {
    var containerRef = (0, react_1.useRef)(null);
    var isDraggingRef = (0, react_1.useRef)(false);
    var _a = (0, react_1.useState)(true), isLightOn = _a[0], setIsLightOn = _a[1];
    var isMobile = (0, use_mobile_1.useIsMobile)();
    var x = (0, framer_motion_1.useMotionValue)(0);
    var y = (0, framer_motion_1.useMotionValue)(0);
    var rotation = (0, framer_motion_1.useMotionValue)(0);
    var dynamicOrigin = (0, react_1.useMemo)(function () { return ({ x: x, y: y }); }, [x, y]);
    var _b = (0, use_init_elastic_box_positions_1.useInitElasticBoxPositions)(containerRef, x, y), isPositioned = _b.isPositioned, anchor = _b.anchor, restPosition = _b.restPosition;
    (0, use_gravity_effect_1.useGravityEffect)({ anchor: anchor, restPosition: restPosition, x: x, y: y, rotation: rotation, isDraggingRef: isDraggingRef });
    var handlePointerDown = function (e) {
        isDraggingRef.current = true;
        var target = e.target;
        target.setPointerCapture(e.pointerId);
        window.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("pointerup", handlePointerUp);
    };
    var handlePointerMove = function (e) {
        if (isDraggingRef.current && containerRef.current) {
            var rect = containerRef.current.getBoundingClientRect();
            x.set(e.clientX - rect.left);
            y.set(e.clientY - rect.top);
        }
    };
    var handlePointerUp = function () {
        isDraggingRef.current = false;
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
    };
    var handleToggle = function () { return setIsLightOn(function (prev) { return !prev; }); };
    return (<section id="hero" ref={containerRef} className="relative min-h-screen flex flex-col md:flex-row items-center justify-center overflow-hidden p-6 gap-10" style={{
            background: "radial-gradient(circle, #1E293B 0%, #0F172A 100%)",
        }}>
      {/* Затемнение при выключенном свете */}
      <framer_motion_1.motion.div className="absolute inset-0 z-30 pointer-events-none" style={{ backgroundColor: "#020617" }} animate={{ opacity: isLightOn ? 0 : 0.85 }} transition={{ duration: 0.5 }}/>

      {/* Переключатель */}



     {!isMobile && (<div className="absolute inset-0 z-0">
    <solution_hero_background_1.BackgroundEffects dynamicOrigin={dynamicOrigin} isLightOn={isLightOn}/>
  </div>)}

     {/* Лампа — вынесена поверх всего */}
    <div className="absolute inset-0 pointer-events-none z-40">
  {!isMobile && isPositioned && (<lamp_1.Lamp x={x} y={y} rotation={rotation} anchor={anchor} isLightOn={isLightOn} onPointerDown={handlePointerDown} onCordPull={handleToggle}/>)}

    </div>



      {/* Правая часть — карточка */}
      <div className="md:w-1/2 w-full flex justify-center z-20">
        <_3d_card_1.CardContainer className="inter-var">
          <_3d_card_1.CardBody className="bg-fuchsia-50/10 relative group/card dark:hover:shadow-2xl dark:hover:shadow-purple-500/10 dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full sm:w-[28rem] h-auto rounded-xl p-6 border">
            <_3d_card_1.CardItem translateZ="50" className="text-xl font-bold text-purple-500 dark:text-white">
              אני דיאנה
            </_3d_card_1.CardItem>
            <_3d_card_1.CardItem as="p" translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
              מעצבת יופי לך
            </_3d_card_1.CardItem>
            <_3d_card_1.CardItem translateZ="100" className="w-full mt-4">
              <image_1.default src="/images/diana-manicure-2.png" height={1000} width={1000} className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-2xl" alt="thumbnail"/>
              
            </_3d_card_1.CardItem>
            <div className="flex justify-between items-center mt-20">

  {/* PORTFOLIO BUTTON */}
  <link_1.default href="/#projects">
    <_3d_card_1.CardItem translateZ={20} target="__blank" className="px-4 py-2 rounded-xl text-lg font-bold text-white">
      פורטפוליו →
    </_3d_card_1.CardItem>
  </link_1.default>

  {/* BOOKING BUTTON */}
  <link_1.default href="#booking">
    <_3d_card_1.CardItem translateZ={20} target="__blank" className="px-4 py-2 rounded-xl bg-purple-500 dark:bg-white dark:text-black text-white text-lg font-bold">
      קבעי תור
    </_3d_card_1.CardItem>
  </link_1.default>

    </div>

          </_3d_card_1.CardBody>
        </_3d_card_1.CardContainer>
      </div>

      {/* Левая часть — описание */}
      <div className="md:w-1/2 w-full text-right md:text-right mb-10 md:mb-0 z-20" dir="rtl">
        <h2 className="text-5xl md:text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl text-purple-100">
          ציפורניים
          <br />
          <highlighted_text_1.HighlightedText>שמדברות עליך</highlighted_text_1.HighlightedText>
        </h2>

        <p className="text-lg text-purple-200 mb-6 leading-relaxed">
          אני דיאנה — בית קטן בנהריה, אווירה רגועה, קפה חם וציפורניים מושלמות.
          עיצוב מותאם אישית, חומרים איכותיים והרבה אהבה לפרטים הקטנים.
        </p>

        <div className="flex justify-between w-full mt-8 text-purple-200 font-medium" dir="rtl">
          <div className="flex flex-col items-center text-center w-1/3">
            <span className="text-2xl leading-none">⭐</span>
            <span className="text-sm mt-1 leading-tight">דירוג ממוצע</span>
          </div>

          <div className="flex flex-col items-center text-center w-1/3">
            <span className="text-2xl leading-none">+6</span>
            <span className="text-sm mt-1 leading-tight">שנות ניסיון</span>
          </div>

          <div className="flex flex-col items-center text-center w-1/3">
            <span className="text-2xl leading-none">+500</span>
            <span className="text-sm mt-1 leading-tight">לקוחות מרוצות</span>
          </div>
        </div>
      </div>
    </section>);
}

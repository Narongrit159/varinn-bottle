import { useState, useRef, useEffect, forwardRef } from 'react'
import { HexColorPicker } from 'react-colorful'
import { motion, AnimatePresence } from 'framer-motion'

export default function CustomizationControls({
  setMainColor,
  setSubColor,
  setPaColor,
  main_color,
  sub_color,
  paColor,
  onSelectPattern,
}) {
  const [mainOpen, setMainOpen] = useState(false)
  const [subOpen, setSubOpen] = useState(false)
  const [paOpen, setPaOpen] = useState(false)
  const mainRef = useRef()
  const subRef = useRef()
  const paRef = useRef()

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mainRef.current && !mainRef.current.contains(e.target))
        setMainOpen(false)
      if (subRef.current && !subRef.current.contains(e.target))
        setSubOpen(false)
      if (paRef.current && !paRef.current.contains(e.target)) setPaOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  return (
    <div className="flex flex-col gap-6 p-2 sm:p-4 rounded-3xl max-w-sm w-full ">
      <div className="flex flex-col gap-6 p-2 sm:p-4 rounded-3xl max-w-sm w-full">
        {/* Main Color */}
        <div className="relative w-full">
          <div
            className="flex flex-col gap-3 sm:gap-1 cursor-pointer justify-between"
            onClick={() => setMainOpen(!mainOpen)}
          >
            <label className="text-sm font-semibold text-gray-600 whitespace-nowrap">
              Main Color
            </label>
            <div
              className="w-full h-12 rounded-xl border border-[#e39f94] shadow-sm"
              style={{ backgroundColor: main_color }}
            />
          </div>

          <MotionPopup open={mainOpen} ref={mainRef}>
            <HexColorPicker
              color={main_color}
              onChange={setMainColor}
              style={{
                width: '100%',
                height: '120px',
                borderRadius: '8px',
              }}
            />
          </MotionPopup>
        </div>

        <div className="flex flex-row gap-6">
          <div className="relative w-full">
            <div
              className="flex flex-col  gap-3 sm:gap-1 cursor-pointer justify-between"
              onClick={() => setSubOpen(!subOpen)}
            >
              <label className="text-sm font-semibold text-gray-600 whitespace-nowrap">
                Accent Color
              </label>
              <div
                className="w-full h-12 rounded-xl border border-[#e39f94] shadow-sm"
                style={{ backgroundColor: sub_color }}
              />
            </div>

            <MotionPopup open={subOpen} ref={subRef}>
              <HexColorPicker
                color={sub_color}
                onChange={setSubColor}
                style={{
                  width: '100%',
                  height: '120px',
                  borderRadius: '8px',
                }}
              />
            </MotionPopup>
          </div>
          <div className="relative w-full">
            <div
              className="flex flex-col  gap-3 sm:gap-1 cursor-pointer justify-between"
              onClick={() => setPaOpen(!paOpen)}
            >
              <label className="text-sm font-semibold text-gray-600 whitespace-nowrap">
                Pattern Color
              </label>
              <div
                className="w-full h-12 rounded-xl border border-[#e39f94] shadow-sm"
                style={{ backgroundColor: paColor }}
              />
            </div>

            <MotionPopup open={paOpen} ref={paRef}>
              <HexColorPicker
                color={paColor}
                onChange={setPaColor}
                style={{
                  width: '100%',
                  height: '120px',
                  borderRadius: '8px',
                }}
              />
            </MotionPopup>
          </div>
        </div>
      </div>

      {/* --- Pattern / Texture Selection 1 --- */}
      <div className="flex flex-col gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-600">
            Choose Normal Pattern
          </label>
          <p className="text-gray-500 text-xs italic">
            Celebrate love with romantic designs for your bottle!
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 ">
          {[
            {
              thumb: '/varinn/img/BT-IMG-4.png',
              texture: '/varinn/img/P4.png',
            },
            {
              thumb: '/varinn/img/BT-IMG-5.png',
              texture: '/varinn/img/P5.png',
            },
            {
              thumb: '/varinn/img/BT-IMG-6.png',
              texture: '/varinn/img/P6.png',
            },
            { thumb: '/varinn/img/null-10.png', texture: 'null' },
          ].map((item) => (
            <button
              key={item.texture}
              className="rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:ring-2 hover:ring-[#e39f94] transition-all duration-300"
              onClick={() => onSelectPattern(item.texture)}
            >
              <img
                src={item.thumb}
                alt="Pattern Preview"
                className="w-full h-20 object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* --- Pattern / Texture Selection 2 --- */}
      <div className="flex flex-col gap-4 bg-[#fff4f2] p-4 rounded-2xl border border-[#e39f94] shadow-sm">
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700">
            Choose Valentine's Pattern
          </label>
          <p className="text-gray-500 text-xs italic">
            Only available for Valentine's! Add extra charm with these festive
            romantic patterns.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 ">
          {[
            {
              thumb: '/varinn/img/BT-IMG-1.png',
              texture: '/varinn/img/P1.png',
            },
            {
              thumb: '/varinn/img/BT-IMG-2.png',
              texture: '/varinn/img/P2.png',
            },
            {
              thumb: '/varinn/img/BT-IMG-3.png',
              texture: '/varinn/img/P3.png',
            },
            { thumb: '/varinn/img/null-10.png', texture: 'null' },
          ].map((item) => (
            <button
              key={item.texture}
              className="rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:ring-2 hover:ring-[#e39f94] transition-all duration-300"
              onClick={() => onSelectPattern(item.texture)}
            >
              <img
                src={item.thumb}
                alt="Pattern Preview"
                className="w-full h-20 object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      <p className="text-gray-600 text-sm text-center italic tracking-wide">
        Personalize your bottle with romantic Valentine's patterns and colors 💌
      </p>
    </div>
  )
}

const MotionPopup = forwardRef(({ children, open }, ref) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          className="absolute z-50 mt-2 p-2 bg-white rounded-xl shadow-xl w-full"
          style={{
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
})

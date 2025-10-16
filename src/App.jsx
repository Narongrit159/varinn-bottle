// src/App.jsx
import { useState } from 'react'
import BottleViewer from './components/BottleViewer'
import CustomizationControls from './components/CustomizationControls'

function App() {
  const [mainColor, setMainColor] = useState('#f3edf3')
  const [subColor, setSubColor] = useState('#6b6b6b')
  const [paColor, setPaColor] = useState('#6b6b6b')
  const [selectedModel, setSelectedModel] = useState('/models/varrinn-1.glb')
  const [selectedImage, setSelectedImage] = useState('')

  return (
    <div className="flex flex-col w-screen h-screen bg-gradient-to-br from-pink-200 via-white to-pink-100 font-sans p-4 gap-3 overflow-auto lg:p-8 lg:gap-4 lg:pb-4">
      <div className="flex flex-col lg:flex-row p-4 gap-4 lg:p-6 lg:h-full lg:justify-between rounded-3xl bg-white border border-pink-200 shadow-2xl transition-all duration-500 hover:shadow-3xl">
        {/* Left Side - Bottle Viewer */}
        <div className="flex flex-col w-full items-center justify-center gap-3 lg:gap-4">
          <div className="cursor-pointer">
            <div className="text-3xl sm:text-5xl font-extrabold text-pink-700 text-center tracking-wider drop-shadow-lg transition-transform duration-300 hover:scale-105 hover:text-pink-500 hover:drop-shadow-2xl">
              VARINN
            </div>
            <div className="text-xs sm:text-sm text-pink-500 text-center italic transition-colors duration-300 hover:text-pink-600">
              Rotate your bottle to admire every luxurious angle 💖
            </div>
          </div>
          <div className="flex flex-col w-full h-80 sm:h-full rounded-2xl overflow-hidden ">
            <BottleViewer
              modelUrl={selectedModel}
              main_color={mainColor}
              sub_color={subColor}
              paColor={paColor}
              selectedImage={selectedImage}
            />
          </div>
        </div>

        <div className="hidden lg:block h-full border-l border-gray-300 my-2 hover:border-emerald-500 transition-colors duration-300 mx-4"></div>

        <div className="flex flex-col p-3 sm:p-2 min-w-full sm:min-w-[400px] gap-3 sm:gap-2">
          <div className="flex flex-col">
            <div className="text-lg sm:text-2xl font-bold   text-pink-700 text-center border-b pb-1 sm:pb-2 border-pink-200 tracking-wide transition-colors duration-300 hover:text-pink-600">
              Customize
            </div>
            <CustomizationControls
              main_color={mainColor}
              sub_color={subColor}
              paColor={paColor}
              setPaColor={setPaColor}
              setMainColor={setMainColor}
              setSubColor={setSubColor}
              onModelChange={setSelectedModel}
              onSelectPattern={setSelectedImage}
            />
          </div>
          <button className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-full bg-pink-600 text-white font-semibold shadow-xl hover:bg-pink-700 hover:scale-105 transform transition-all duration-300">
            Order Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default App

"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stage } from "@react-three/drei"
import { SofaModel } from "./sofa-model"
import { ConfigPanel } from "./config-panel"
import { useSofaStore } from "@/store/sofa"
import { Suspense } from "react"

function LoadingSpinner() {
  return (
    <div className="flex h-full items-center justify-center">
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !border-0 !p-0 !whitespace-nowrap ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  )
}
export function Configurator() {
  const { hasArms, isReclined, isBed } = useSofaStore()

  return (
    <div className="flex flex-1 flex-col md:flex-row">
      <div className="relative h-[50vh] flex-1 md:h-auto">
        <Canvas shadows dpr={[1, 2]} camera={{ fov: 50 }}>
          <Suspense fallback={null}>
            <Stage environment="city" intensity={0.5} adjustCamera={1.5}>
              <SofaModel
                hasArms={hasArms}
                isReclined={isReclined}
                isBed={isBed}
              />
            </Stage>
          </Suspense>
          <OrbitControls
            makeDefault
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2}
          />
        </Canvas>
        <div className="bg-background/80 absolute top-4 left-4 rounded-md p-2 backdrop-blur-sm">
          <p className="text-muted-foreground text-sm">
            Click and drag to rotate • Scroll to zoom
          </p>
        </div>
      </div>
      <ConfigPanel />
    </div>
  )
}

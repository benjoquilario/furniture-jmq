"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSofaStore } from "@/store/sofa"
import { ColorSelector } from "./color-selector"

export function ConfigPanel() {
  const {
    hasArms,
    isReclined,
    isBed,
    toggleArms,
    toggleRecline,
    toggleBedMode,
  } = useSofaStore()

  return (
    <div className="bg-muted/40 w-full border-l p-6 md:w-80">
      <h2 className="mb-6 text-2xl font-bold">Customize Your Sofa</h2>

      <Tabs defaultValue="style">
        <TabsList className="mb-6 grid w-full grid-cols-3">
          <TabsTrigger value="style">Style</TabsTrigger>
          <TabsTrigger value="material">Material</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
        </TabsList>

        <TabsContent value="style">
          <div className="space-y-6">
            <div>
              <Label className="text-base">Color</Label>
              <ColorSelector />
            </div>

            <div>
              <Label htmlFor="hasArms" className="text-base">
                Armrests
              </Label>
              <div className="mt-2 flex items-center gap-4">
                <Button
                  variant={hasArms ? "default" : "outline"}
                  onClick={toggleArms}
                >
                  With Arms
                </Button>
                <Button
                  variant={!hasArms ? "default" : "outline"}
                  onClick={toggleArms}
                >
                  Armless
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="material">
          <div className="space-y-4">
            <Label className="text-base">Material Type</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="justify-start">
                <div className="mr-2 h-6 w-6 rounded bg-zinc-300"></div>
                Fabric
              </Button>
              <Button variant="outline" className="justify-start">
                <div className="mr-2 h-6 w-6 rounded bg-amber-700"></div>
                Leather
              </Button>
              <Button variant="outline" className="justify-start">
                <div className="mr-2 h-6 w-6 rounded bg-zinc-700"></div>
                Microfiber
              </Button>
              <Button variant="outline" className="justify-start">
                <div className="mr-2 h-6 w-6 rounded bg-slate-400"></div>
                Velvet
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="features">
          <div className="space-y-6">
            <div>
              <Label className="text-base">Recliner</Label>
              <div className="mt-2 flex items-center gap-4">
                <Button
                  variant={isReclined ? "default" : "outline"}
                  onClick={toggleRecline}
                >
                  Reclined
                </Button>
                <Button
                  variant={!isReclined ? "default" : "outline"}
                  onClick={toggleRecline}
                >
                  Standard
                </Button>
              </div>
            </div>

            <div>
              <Label className="text-base">Configuration</Label>
              <div className="mt-2 flex items-center gap-4">
                <Button
                  variant={isBed ? "default" : "outline"}
                  onClick={toggleBedMode}
                >
                  Bed Mode
                </Button>
                <Button
                  variant={!isBed ? "default" : "outline"}
                  onClick={toggleBedMode}
                >
                  Sofa Mode
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <Button className="w-full">Save Configuration</Button>
      </div>
    </div>
  )
}

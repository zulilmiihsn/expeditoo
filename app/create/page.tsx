"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { MainLayout } from "@/components/main-layout"
import { Stepper } from "@/components/stepper"
import { PhotoDropzone } from "@/components/photo-dropzone"
import { ArrowLeft } from "lucide-react"

export default function CreatePage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [photos, setPhotos] = useState<string[]>([])
  const [formData, setFormData] = useState({
    // Colis
    quantity: "1",
    designation: "",
    knowDimensions: false,
    length: "",
    width: "",
    height: "",
    size: "",
    weight: "",

    // Départ
    departOrigin: "",
    departCity: "",
    departFlexible: false,
    departHelp: false,

    // Arrivée
    arriveeDestination: "",
    arriveeCity: "",
    excludeDays: "",
    timeWindow: "",

    // Prix
    price: "",
    travelWithItem: false,
    publicInfo: "",
  })

  const steps = ["Item", "Pickup", "Delivery", "Price"]

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    console.log("Form submitted:", { ...formData, photos })
    // Handle submission
  }

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto p-4 md:p-6 pb-24 md:pb-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          {currentStep > 0 && (
            <button onClick={handlePrev} className="p-2 hover:bg-muted rounded-lg transition-all duration-200 ease-out">
              <ArrowLeft className="w-6 h-6" />
            </button>
          )}
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">New listing</h1>
        </div>

        {/* Stepper */}
        <Stepper steps={steps} currentStep={currentStep} />

        {/* Step Content */}
        <div className="bg-card rounded-xl p-6 border border-border mb-6 space-y-6">
          {/* Step 1: Colis */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <div>
                <Label className="text-base font-bold mb-3 block">Photos</Label>
                <PhotoDropzone photos={photos} onPhotosChange={setPhotos} />
              </div>

              {/* Info box with robot */}
              <div className="bg-accent-pink/10 border border-accent-pink/20 rounded-xl p-4 flex gap-3">
                <div className="text-3xl flex-shrink-0">🤖</div>
                <div>
                  <p className="font-bold text-foreground mb-1">New!</p>
                  <p className="text-sm text-foreground">Add photos, we'll handle the rest</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => handleInputChange("quantity", e.target.value)}
                    className="h-12 rounded-full mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="size">Size</Label>
                  <Select value={formData.size} onValueChange={(value) => handleInputChange("size", value)}>
                    <SelectTrigger className="h-12 rounded-full mt-2">
                      <SelectValue placeholder="Choose a size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="XS">XS</SelectItem>
                      <SelectItem value="S">S</SelectItem>
                      <SelectItem value="M">M</SelectItem>
                      <SelectItem value="L">L</SelectItem>
                      <SelectItem value="XL">XL</SelectItem>
                      <SelectItem value="XXL">XXL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="designation">Description</Label>
                <Input
                  id="designation"
                  placeholder="Ex: Sofa, armchair, etc..."
                  value={formData.designation}
                  onChange={(e) => handleInputChange("designation", e.target.value)}
                  className="h-12 rounded-full mt-2"
                />
              </div>

              <div>
                <Label htmlFor="weight">Weight</Label>
                <Select value={formData.weight} onValueChange={(value) => handleInputChange("weight", value)}>
                  <SelectTrigger className="h-12 rounded-full mt-2">
                    <SelectValue placeholder="Choose a weight range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-5">0 - 5 kg</SelectItem>
                    <SelectItem value="5-10">5 - 10 kg</SelectItem>
                    <SelectItem value="10-25">10 - 25 kg</SelectItem>
                    <SelectItem value="25-50">25 - 50 kg</SelectItem>
                    <SelectItem value="50+">50+ kg</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Dimensions Toggle */}
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg cursor-pointer">
                <Checkbox
                  checked={formData.knowDimensions}
                  onCheckedChange={(checked) => handleInputChange("knowDimensions", checked)}
                />
                <Label className="cursor-pointer flex-1">I know the dimensions</Label>
              </div>

              {formData.knowDimensions && (
                <div className="grid grid-cols-3 gap-3">
                  <Input
                    placeholder="L (cm)"
                    type="number"
                    value={formData.length}
                    onChange={(e) => handleInputChange("length", e.target.value)}
                    className="h-12 rounded-full"
                  />
                  <Input
                    placeholder="l (cm)"
                    type="number"
                    value={formData.width}
                    onChange={(e) => handleInputChange("width", e.target.value)}
                    className="h-12 rounded-full"
                  />
                  <Input
                    placeholder="H (cm)"
                    type="number"
                    value={formData.height}
                    onChange={(e) => handleInputChange("height", e.target.value)}
                    className="h-12 rounded-full"
                  />
                </div>
              )}

              <Button variant="outline" className="w-full h-12 rounded-full bg-transparent">
                Add another item
              </Button>
            </div>
          )}

          {/* Step 2: Départ */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="origin">Pickup location</Label>
                <Input
                  id="origin"
                  placeholder="Address or city"
                  value={formData.departOrigin}
                  onChange={(e) => handleInputChange("departOrigin", e.target.value)}
                  className="h-12 rounded-full mt-2"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg cursor-pointer">
                  <Checkbox
                    checked={formData.departFlexible}
                    onCheckedChange={(checked) => handleInputChange("departFlexible", checked)}
                  />
                  <Label className="cursor-pointer flex-1">Flexible zone</Label>
                </div>
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg cursor-pointer">
                  <Checkbox
                    checked={formData.departHelp}
                    onCheckedChange={(checked) => handleInputChange("departHelp", checked)}
                  />
                  <Label className="cursor-pointer flex-1">Help carrying items</Label>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Arrivée */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="destination">Delivery location</Label>
                <Input
                  id="destination"
                  placeholder="Address or city"
                  value={formData.arriveeDestination}
                  onChange={(e) => handleInputChange("arriveeDestination", e.target.value)}
                  className="h-12 rounded-full mt-2"
                />
              </div>

              <div>
                <Label htmlFor="timeWindow">Time window</Label>
                <Select value={formData.timeWindow} onValueChange={(value) => handleInputChange("timeWindow", value)}>
                  <SelectTrigger className="h-12 rounded-full mt-2">
                    <SelectValue placeholder="Choose a time window" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (6am-12pm)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12pm-6pm)</SelectItem>
                    <SelectItem value="evening">Evening (6pm-10pm)</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="excludeDays">Days to exclude</Label>
                <Input
                  id="excludeDays"
                  placeholder="Ex: Sunday, holidays"
                  value={formData.excludeDays}
                  onChange={(e) => handleInputChange("excludeDays", e.target.value)}
                  className="h-12 rounded-full mt-2"
                />
              </div>
            </div>
          )}

          {/* Step 4: Prix */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="price">Suggested price</Label>
                <div className="relative mt-2">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">€</span>
                  <Input
                    id="price"
                    type="number"
                    placeholder="0"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    className="h-12 rounded-full pl-8"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg cursor-pointer">
                <Checkbox
                  checked={formData.travelWithItem}
                  onCheckedChange={(checked) => handleInputChange("travelWithItem", checked)}
                />
                <Label className="cursor-pointer flex-1">Travel with my item</Label>
              </div>

              <div>
                <Label htmlFor="publicInfo">Additional information</Label>
                <p className="text-xs text-muted-foreground mt-1 mb-2">
                  This information is public. To protect your privacy, don't share your contact details (email, phone,
                  or address).
                </p>
                <Textarea
                  id="publicInfo"
                  placeholder="Ex: The longest box is 2m15, the heaviest is a sofa"
                  value={formData.publicInfo}
                  onChange={(e) => handleInputChange("publicInfo", e.target.value)}
                  className="rounded-2xl min-h-32"
                />
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="fixed bottom-20 md:bottom-6 left-0 right-0 md:relative px-4 md:px-0 space-y-2">
          {currentStep < steps.length - 1 ? (
            <>
              <Button onClick={handleNext} className="w-full h-12 rounded-full text-base font-bold">
                Next
              </Button>
              {currentStep > 0 && (
                <Button
                  onClick={handlePrev}
                  variant="outline"
                  className="w-full h-12 rounded-full text-base font-bold bg-transparent"
                >
                  Back
                </Button>
              )}
            </>
          ) : (
            <>
              <Button onClick={handleSubmit} className="w-full h-12 rounded-full text-base font-bold">
                Publish listing
              </Button>
              <Button
                onClick={handlePrev}
                variant="outline"
                className="w-full h-12 rounded-full text-base font-bold bg-transparent"
              >
                Back
              </Button>
            </>
          )}
        </div>
      </div>
    </MainLayout>
  )
}

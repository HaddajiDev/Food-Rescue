"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { UploadIcon, Camera, Loader2, X, Salad, UtensilsCrossed } from "lucide-react"
import { useRouter } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import useDataStore from "../store/DataStore";

export function Upload() {
  const router = useRouter()
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null)
  const [uploadMode, setUploadMode] = useState<"ingredients" | "leftovers">("ingredients")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const { handleData }: any = useDataStore();

  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [cameraStream])

  useEffect(() => {
    if (isCameraActive && videoRef.current && cameraStream) {
      videoRef.current.srcObject = cameraStream
      videoRef.current.play().catch((err) => {
        console.error("Error playing video:", err)
        alert("Failed to start camera preview.")
        stopCamera()
      })
    }
  }, [isCameraActive, cameraStream])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      simulateUpload(file)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      simulateUpload(file)
    }
  }

  const simulateUpload = async(file: File) => {
    setIsUploading(true)

    const reader = new FileReader()
    reader.onload = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
    await handleData(file);
    sessionStorage.setItem("uploadMode", uploadMode)
    setIsUploading(false)
    router.push("/results")
  }

  const activateCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      })

      setCameraStream(stream)
      setIsCameraActive(true)
    } catch (err) {
      console.error("Error accessing camera:", err)
      alert("Failed to access camera. Please check your camera permissions.")
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      const context = canvas.getContext("2d")
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const file = new File([blob], "camera-photo.jpg", { type: "image/jpeg" })
              stopCamera()
              simulateUpload(file)
            }
          },
          "image/jpeg",
          0.95,
        )
      }
    }
  }

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop())
      setCameraStream(null)
    }
    setIsCameraActive(false)
  }

  const getUploadModeText = () => {
    return uploadMode === "ingredients"
      ? "Upload a clear image of your ingredients for recipe suggestions."
      : "Upload a photo of your leftover meal to get creative reuse ideas."
  }

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-8 animate-slide-up">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Upload Your <span className="gradient-text">Food Photo</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Take a picture of your ingredients or leftovers and our AI will suggest creative recipes to help reduce food
          waste.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Tabs
          value={uploadMode}
          onValueChange={(value) => setUploadMode(value as "ingredients" | "leftovers")}
          className="mb-6"
        >
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="ingredients" className="">
              <Salad className="mr-2 h-4 w-4" />
              Ingredients
            </TabsTrigger>
            <TabsTrigger value="leftovers" className="">
              <UtensilsCrossed className="mr-2 h-4 w-4" />
              Leftovers
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Card
          className={`p-8 border-2 border-dashed ${
            isDragging ? "border-primary bg-primary/5 dark:bg-primary/10" : "border-border"
          } rounded-xl transition-all duration-200 shadow-sm hover:shadow-md`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {isCameraActive ? (
            <div className="flex flex-col items-center">
              <div className="relative w-full max-w-md mb-6">
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-auto rounded-lg" />
                <canvas ref={canvasRef} className="hidden" />
              </div>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="border-destructive text-destructive hover:bg-destructive/10"
                  onClick={stopCamera}
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={capturePhoto}>
                  <Camera className="mr-2 h-4 w-4" />
                  Take Photo
                </Button>
              </div>
            </div>
          ) : !preview ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-20 h-20 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mb-6">
                {uploadMode === "ingredients" ? (
                  <Salad className="h-10 w-10 text-primary" />
                ) : (
                  <UtensilsCrossed className="h-10 w-10 text-primary" />
                )}
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {uploadMode === "ingredients" ? "Upload Your Ingredients" : "Upload Your Leftovers"}
              </h3>
              <p className="text-muted-foreground text-center mb-6 max-w-md">{getUploadModeText()}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground relative overflow-hidden group">
                  <span className="absolute inset-0 w-full h-full transition-all duration-300 scale-x-0 transform group-hover:scale-x-100 group-hover:bg-white/10"></span>
                  <UploadIcon className="mr-2 h-4 w-4" />
                  Choose File
                  <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept="image/*"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                  />
                </Button>
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10"
                  onClick={activateCamera}
                >
                  <Camera className="mr-2 h-4 w-4" />
                  Take Photo
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="relative w-full max-w-md mb-6">
                <img
                  src={preview || "/placeholder.svg"}
                  alt="Food preview"
                  className="w-full h-auto rounded-lg object-cover"
                />
                {isUploading && (
                  <div className="absolute inset-0 bg-background/50 dark:bg-background/70 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <Loader2 className="h-10 w-10 text-primary animate-spin" />
                  </div>
                )}
              </div>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="border-destructive text-destructive hover:bg-destructive/10"
                  onClick={() => setPreview(null)}
                  disabled={isUploading}
                >
                  <X className="mr-2 h-4 w-4" />
                  Remove
                </Button>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isUploading}>
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Get Recipes"
                  )}
                </Button>
              </div>
            </div>
          )}
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">Supported formats: JPG, PNG, HEIC • Max size: 10MB</p>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export default function PhishingDetectionForm() {
  const [imageUrl, setImageUrl] = useState("")
  const [result, setResult] = useState<null | { isPhishing: boolean; confidence: number }>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      // This is a placeholder for the actual API call
      // Replace this with your backend API call when it's ready
      const response = await fetch("/api/detect-phishing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze image")
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError("An error occurred while analyzing the image. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Scan for Phishing</CardTitle>
        <CardDescription>Paste an image URL to analyze for phishing attempts</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="url"
            placeholder="Paste image URL here"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Analyzing..." : "Scan Image"}
          </Button>
        </form>

        {error && (
          <div className="mt-4 text-red-500 flex items-center">
            <AlertCircle className="mr-2" />
            {error}
          </div>
        )}

        {result && (
          <div className={`mt-4 ${result.isPhishing ? "text-red-500" : "text-green-500"} flex items-center`}>
            {result.isPhishing ? <AlertCircle className="mr-2" /> : <CheckCircle2 className="mr-2" />}
            {result.isPhishing ? "Potential phishing detected" : "No phishing detected"}
            <span className="ml-2 text-gray-500">(Confidence: {(result.confidence * 100).toFixed(2)}%)</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}


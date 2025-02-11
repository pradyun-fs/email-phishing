"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export default function EmailPhishingDetectionForm() {
  const [emailContent, setEmailContent] = useState("")
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
        body: JSON.stringify({ emailContent }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze email content")
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError("An error occurred while analyzing the email content. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Scan for Phishing</CardTitle>
        <CardDescription>Paste the email content to analyze for phishing attempts</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Paste email content here"
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            required
            className="min-h-[200px]"
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Analyzing..." : "Scan Email Content"}
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


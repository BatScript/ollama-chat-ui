'use client'

import { ModeToggle } from '../../../components/theme-swith-btn'
import { useState } from 'react'
import { Card } from '@/components/ui/card'
import ChatForm from '@/components/chat-form'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [content, setContent] = useState('')

  return (
    <div className="container h-full flex flex-col items-center justify-between gap-4 p-4">
      <div className="p-2 flex mx-auto justify-center items-center gap-4">
        <h1 className="text-3xl font-bold text-center">LLama UI</h1>
        <ModeToggle />
      </div>

      <Card className="w-full h-full p-2">
        {!isLoading && content.length > 0 ? (
          content
        ) : (
          <p className="text-muted-foreground">😏 Go ahead, ask me shit...</p>
        )}
        {isLoading && (
          <p className="m-4 text-center text-muted-foreground">Loading...</p>
        )}
      </Card>

      <div className="w-full">
        <ChatForm setContent={setContent} setIsLoading={setIsLoading} />
      </div>
    </div>
  )
}

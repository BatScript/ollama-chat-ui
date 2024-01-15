import React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Form, FormControl, FormField, FormItem } from './ui/form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { MODELS } from '../constants'

type propType = {
  setContent: React.Dispatch<React.SetStateAction<string>>
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const ChatForm = ({ setContent, setIsLoading }: propType) => {
  const formSchema = z.object({
    model: z.string().min(2).max(50),
    prompt: z.string()
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      model: 'llama2'
    }
  })

  const handleChatSubmit = async (values: z.infer<typeof formSchema>) => {
    setContent('')
    setIsLoading(true)
    const body = values

    const response = await fetch('http://127.0.0.1:11434/api/generate', {
      method: 'POST',
      body: JSON.stringify(body)
    })

    setIsLoading(false)

    const reader = response.body?.getReader()

    if (!reader) {
      throw new Error('~ Failed to fetch ~')
    }

    while (true) {
      const { done, value } = await reader.read()
      if (done) {
        break
      }

      const rawjson = new TextDecoder().decode(value)

      const json = JSON.parse(rawjson)

      if (!json.done) {
        setContent((prev) => (prev += `${json?.response}`))
      }
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleChatSubmit)}
        className="flex justify-center items-center gap-4"
      >
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>Enter Valid Model</FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {MODELS.map((model, index) => {
                        return (
                          <SelectItem value={model.value} key={index}>
                            {model.name}
                          </SelectItem>
                        )
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )
          }}
        />
        <FormField
          name="prompt"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>Enter Valid Prompt</FormControl>
                <Input
                  className="w-full"
                  placeholder="Enter your prompt..."
                  {...field}
                />
              </FormItem>
            )
          }}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default ChatForm

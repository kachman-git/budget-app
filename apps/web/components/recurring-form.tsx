'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'

interface RecurringFormProps {
  type: 'expense' | 'budget'
  onSubmit: (data: any) => Promise<void>
}

export function RecurringForm({ type, onSubmit }: RecurringFormProps) {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [frequency, setFrequency] = useState('monthly')
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await onSubmit({
        name,
        amount: parseFloat(amount),
        frequency,
      })
      toast({
        title: 'Success',
        description: `Recurring ${type} created successfully`,
      })
      setName('')
      setAmount('')
      setFrequency('monthly')
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to create recurring ${type}`,
        variant: 'destructive',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder={`${type.charAt(0).toUpperCase() + type.slice(1)} name`}
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <Select
        value={frequency}
        onValueChange={(value) => setFrequency(value)}
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </Select>
      <Button type="submit">Create Recurring {type.charAt(0).toUpperCase() + type.slice(1)}</Button>
    </form>
  )
}


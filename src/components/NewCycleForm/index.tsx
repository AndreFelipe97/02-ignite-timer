import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { CycleContext } from '../../context/CyclesContext'

import { FormContainer, TaskInput, MinutesAmountInput } from './styles'

export function NewCycleForm() {
  const { activeCycle } = useContext(CycleContext)
  const { register } = useFormContext()
  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        list="task-suggestions"
        placeholder="Dê um nome para seu projeto"
        disabled={!!activeCycle}
        {...register('task')}
      />
      <datalist id="task-suggestions">
        <option value="Projeto 1" />
        <option value="Projeto 2" />
        <option value="Projeto 3" />
      </datalist>

      <label htmlFor="minutesAmount">Durante</label>
      <MinutesAmountInput
        type="number"
        id="minuteAmount"
        disabled={!!activeCycle}
        placeholder="00"
        step={5}
        min={5}
        max={60}
        {...register('minutesAmount', { valueAsNumber: true })}
      />
      <span>Minutos</span>
    </FormContainer>
  )
}

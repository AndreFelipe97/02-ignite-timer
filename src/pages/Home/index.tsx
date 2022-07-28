import { HandPalm, Play } from 'phosphor-react'
import { useContext } from 'react'

import { NewCycleFormData } from './models/NewCycleFormData'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import { NewCycleForm } from '../../components/NewCycleForm'
import { Countdown } from '../../components/Countdown'
import { FormProvider, useForm } from 'react-hook-form'
import { CycleContext } from '../../context/CyclesContext'

export function Home() {
  const { activeCycle, addNewCycles, interruptCycle } = useContext(CycleContext)

  const newCycleForm = useForm<NewCycleFormData>({
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  async function handleCreateNewCycle(data: NewCycleFormData) {
    addNewCycles(data)
    reset()
  }

  const isSubmitDisabled = !watch('task')

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountdownButton onClick={interruptCycle} type="button">
            <HandPalm size={24} /> Começar
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} /> Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}

import clsx from 'clsx'
import { useSwitch, UseSwitchProps } from '@mui/base/SwitchUnstyled'
import { BasicSwitchRoot, BasicSwitchThumb, BasicSwitchInput } from './styled'

export const BasicSwitch = (props: UseSwitchProps) => {
  const { getInputProps, checked, disabled, focusVisible } = useSwitch(props)

  const stateClasses = {
    'Switch-checked': checked,
    'Switch-disabled': disabled,
    'Switch-focusVisible': focusVisible,
  }

  return (
    <BasicSwitchRoot className={clsx(stateClasses)}>
      <BasicSwitchThumb className={clsx(stateClasses)} />
      <BasicSwitchInput {...getInputProps()} aria-label="Demo switch" />
    </BasicSwitchRoot>
  )
}

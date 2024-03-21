import './style.css'
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

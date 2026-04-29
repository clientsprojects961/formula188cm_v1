import type { ReactNode } from "react"

declare namespace JSX {
  interface IntrinsicElements {
    "img-comparison-slider": {
      class?: string
      children?: ReactNode
    }
  }
}

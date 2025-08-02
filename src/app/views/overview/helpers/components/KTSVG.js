import React from 'react'
import SVG from 'react-inlinesvg'
import { toAbsoluteUrl } from '../AssetHelpers'

const KTSVG = (props) => {
  const {
    className,
    path,
    svgClassName
  } = props

  return (
    <span className={`svg-icon ${className}`}>
      <SVG src={toAbsoluteUrl(path)} className={svgClassName} />
    </span>
  )
}

export { KTSVG }

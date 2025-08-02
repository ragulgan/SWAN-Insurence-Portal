import React, { useEffect, useState } from 'react'

const usePageTitle = title => {
  const [pagetitle, setPagetitle] = useState(title)
  useEffect(() => {
    document.title = pagetitle
  }, [pagetitle])

  return [pagetitle, setPagetitle]
}

export { usePageTitle }

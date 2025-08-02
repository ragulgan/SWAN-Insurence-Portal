import React, { useMemo, useEffect, useState } from 'react'
import { AsideMenuList } from './AsideMenuList'
import { connect } from 'react-redux'
import _ from 'lodash'
import { useHtmlClassService } from '../../../_core/MetronicLayout'
import { ProfileActions } from '../../../../../store/actions'
import { SVG_ICONS } from '../../../../../helpers/constants'

const AsideMenu = (props) => {
  const { profileLoading, myMenusList, myMenuDispacth } = props
  const [menus, setMenus] = useState(null)
  const uiService = useHtmlClassService()
  const layoutProps = useMemo(() => {
    return {
      layoutConfig: uiService.config,
      asideMenuAttr: uiService.getAttributes('aside_menu'),
      ulClasses: uiService.getClasses('aside_menu_nav', true),
      asideClassesFromConfig: uiService.getClasses('aside_menu', true)
    }
  }, [uiService])

  // Fetch menus
  useEffect(() => {
    myMenuDispacth()
  }, [])

  const filterMenu = myMenusList?.filter((item) => (
    item?.PRGNAME === 'HOME' || item?.PRGNAME === 'QUOTES'
  ))
  // Process menus
  useEffect(() => {
    if (filterMenu) {
      const tempMenu = []
      let counter = 1
      _.forEach(filterMenu, function (menu) {
        const tempSubMenu = []
        const subMenu = _.has(menu, 'SUBMENU')
        if (subMenu) {
          _.forEach(menu.SUBMENU, function (subMenu) {
            tempSubMenu.push({
              key: `S_${counter}`,
              menu: subMenu?.PRGNAME,
              slug: 'quotes/list', //for disabling active 
              icon: SVG_ICONS[subMenu?.PRGNAME]
            })
          })
        }
        tempMenu.push({
          key: `M_${counter}`,
          menu: menu?.PRGNAME && menu?.PRGNAME === 'HOME' ? 'OVERVIEW' : menu?.PRGNAME,
          slug: menu?.PRGNAME.toLowerCase() && menu?.PRGNAME.toLowerCase() === 'home' ? 'overview' : menu?.PRGNAME.toLowerCase(),
          icon: SVG_ICONS[menu?.PRGNAME],
          submenu: tempSubMenu
        })

        counter++
      })

      setMenus(tempMenu)
    }
  }, [myMenusList])

  return (
    <>
      <div
        id='kt_aside_menu'
        data-menu-vertical='1'
        className={`aside-menu my-4 ${layoutProps.asideClassesFromConfig}`}
        {...layoutProps.asideMenuAttr}
      >
        <AsideMenuList
          layoutProps={layoutProps}
          loading={profileLoading}
          menus={menus}
        />
      </div>
    </>
  )
}

const mapStateToProps = state => {
  const { Profile } = state
  return {
    profileLoading: Profile.profileLoading,
    myMenusList: Profile.myMenusList
  }
}

const mapDispatchToProps = dispatch => ({
  myMenuDispacth: () => dispatch(ProfileActions.MyMenus())
})

export default connect(mapStateToProps, mapDispatchToProps)(AsideMenu)

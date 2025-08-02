import Env from './env_config'

const CommonRoutes = [
  {
    key: 'overview',
    title: 'Overview',
    icon: '/icons/Layers.svg'
  },
  {
    key: 'clients',
    title: 'Clients',
    icon: '/icons/Group.svg'
  },
  {
    key: 'policies',
    title: 'Policies',
    icon: '/icons/Shield-protected.svg'
  },
  {
    key: 'quotes',
    title: 'Quotes',
    icon: '/icons/Write.svg',
    menu: [
      {
        key: 'quotes_health',
        route: 'quotes/list?show=health',
        title: 'Health',
        icon: 'heart-beat'
      },
      {
        key: 'quotes_home',
        route: 'quotes/list?show=home',
        title: 'Home',
        icon: 'home'
      },
      {
        key: 'quotes_marine',
        route: 'quotes/list?show=marine',
        title: 'Marine',
        icon: 'ship-alt'
      },
      {
        key: 'quotes_motor',
        route: 'quotes/list?show=motor',
        title: 'Motor',
        icon: 'car'
      },
      {
        key: 'quotes_travel',
        route: 'quotes/list?show=travel',
        title: 'Travel',
        icon: 'airplane-alt'
      }
    ]
  },
  {
    key: 'debtors',
    title: 'Debtors',
    icon: '/icons/Warning-2.svg'
  },
  {
    key: 'instructions',
    title: 'Instructions',
    icon: '/icons/Clipboard-list.svg'
  },
  {
    key: 'reports',
    title: 'Reports',
    icon: '/icons/Equalizer.svg'
  },
  {
    key: 'documents',
    title: 'Documents',
    icon: '/icons/Archive.svg'
  },
  {
    key: 'aml',
    title: 'AML',
    icon: '/icons/Dollar.svg'
  }
]

const AgentRoutes = [
  {
    key: 'profile',
    title: 'Profile',
    icon: '/icons/Wallet.svg'
  }
]

const BrokerRoutes = [
  {
    key: 'profile',
    title: 'Profile',
    icon: '/icons/Wallet.svg'
  }
]

const CustomerRoutes = [
  {
    key: 'profile',
    title: 'Profile',
    icon: '/icons/Wallet.svg'
  }
]

const RouteConfig = {
  common: CommonRoutes,
  agent: AgentRoutes,
  broker: BrokerRoutes,
  customer: CustomerRoutes
}

export default RouteConfig

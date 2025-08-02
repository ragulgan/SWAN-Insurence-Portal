import { toAbsoluteUrl } from '../../../../_metronic/_helpers'

export default [
  {
    id: 1,
    username: 'admin',
    password: 'demo',
    email: 'admin@demo.com',
    authToken: 'auth-token-8f3ae836da744329a6f93bf20594b5cc',
    authRole: 'customer',
    refreshToken: 'auth-token-f8c137a2c98743f48b643e71161d90aa',
    roles: [1], // Administrator
    pic: toAbsoluteUrl('/media/users/300_21.jpg'),
    fullname: 'Sean S',
    firstname: 'Catherine',
    lastname: 'Lee',
    occupation: 'Claim Administrator',
    companyName: 'Keenthemes',
    phone: '456669067890',
    language: 'en',
    timeZone: 'International Date Line West',
    website: 'https://keenthemes.com',
    emailSettings: {
      emailNotification: true,
      sendCopyToPersonalEmail: false,
      activityRelatesEmail: {
        youHaveNewNotifications: false,
        youAreSentADirectMessage: false,
        someoneAddsYouAsAsAConnection: true,
        uponNewOrder: false,
        newMembershipApproval: false,
        memberRegistration: true
      },
      updatesFromKeenthemes: {
        newsAboutKeenthemesProductsAndFeatureUpdates: false,
        tipsOnGettingMoreOutOfKeen: false,
        thingsYouMissedSindeYouLastLoggedIntoKeen: true,
        newsAboutMetronicOnPartnerProductsAndOtherServices: true,
        tipsOnMetronicBusinessProducts: true
      }
    },
    communication: {
      email: true,
      sms: true,
      phone: false
    },
    address: {
      addressLine: 'L-12-20 Vertex, Cybersquare',
      city: 'San Francisco',
      state: 'California',
      postCode: '45000'
    },
    socialNetworks: {
      linkedIn: 'https://linkedin.com/admin',
      facebook: 'https://facebook.com/admin',
      twitter: 'https://twitter.com/admin',
      instagram: 'https://instagram.com/admin'
    }
  },
  {
    id: 2,
    username: 'user',
    password: 'demo',
    email: 'user@demo.com',
    authToken: 'auth-token-6829bba69dd3421d8762-991e9e806dbf',
    authRole: 'broker',
    refreshToken: 'auth-token-f8e4c61a318e4d618b6c199ef96b9e55',
    roles: [2], // Manager
    pic: toAbsoluteUrl('/media/users/100_2.jpg'),
    fullname: 'Megan F',
    firstname: 'Megan',
    lastname: 'Fox',
    occupation: 'Deputy Head of Keenthemes in New York office',
    companyName: 'Keenthemes',
    phone: '456669067891',
    language: 'en',
    timeZone: 'International Date Line West',
    communication: {
      email: true,
      sms: true,
      phone: false
    },
    emailSettings: {
      emailNotification: true,
      sendCopyToPersonalEmail: false,
      activityRelatesEmail: {
        youHaveNewNotifications: false,
        youAreSentADirectMessage: false,
        someoneAddsYouAsAsAConnection: true,
        uponNewOrder: false,
        newMembershipApproval: false,
        memberRegistration: true
      },
      updatesFromKeenthemes: {
        newsAboutKeenthemesProductsAndFeatureUpdates: false,
        tipsOnGettingMoreOutOfKeen: false,
        thingsYouMissedSindeYouLastLoggedIntoKeen: true,
        newsAboutMetronicOnPartnerProductsAndOtherServices: true,
        tipsOnMetronicBusinessProducts: true
      }
    },
    address: {
      addressLine: '3487  Ingram Road',
      city: 'Greensboro',
      state: 'North Carolina',
      postCode: '27409'
    },
    socialNetworks: {
      linkedIn: 'https://linkedin.com/user',
      facebook: 'https://facebook.com/user',
      twitter: 'https://twitter.com/user',
      instagram: 'https://instagram.com/user'
    }
  },
  {
    id: 3,
    username: 'guest',
    password: 'demo',
    email: 'guest@demo.com',
    authToken: 'auth-token-d2dff7b82f784de584b60964abbe45b9',
    authRole: 'agent',
    refreshToken: 'auth-token-c999ccfe74aa40d0aa1a64c5e620c1a5',
    roles: [3], // Guest
    pic: toAbsoluteUrl('/media/users/default.jpg'),
    fullname: 'Manu G',
    firstname: 'Manu',
    lastname: 'Ginobili',
    occupation: 'CFO',
    companyName: 'Keenthemes',
    phone: '456669067892',
    language: 'en',
    timeZone: 'International Date Line West',
    communication: {
      email: true,
      sms: true,
      phone: false
    },
    emailSettings: {
      emailNotification: true,
      sendCopyToPersonalEmail: false,
      activityRelatesEmail: {
        youHaveNewNotifications: false,
        youAreSentADirectMessage: false,
        someoneAddsYouAsAsAConnection: true,
        uponNewOrder: false,
        newMembershipApproval: false,
        memberRegistration: true
      },
      updatesFromKeenthemes: {
        newsAboutKeenthemesProductsAndFeatureUpdates: false,
        tipsOnGettingMoreOutOfKeen: false,
        thingsYouMissedSindeYouLastLoggedIntoKeen: true,
        newsAboutMetronicOnPartnerProductsAndOtherServices: true,
        tipsOnMetronicBusinessProducts: true
      }
    },
    address: {
      addressLine: '1467  Griffin Street',
      city: 'Phoenix',
      state: 'Arizona',
      postCode: '85012'
    },
    socialNetworks: {
      linkedIn: 'https://linkedin.com/guest',
      facebook: 'https://facebook.com/guest',
      twitter: 'https://twitter.com/guest',
      instagram: 'https://instagram.com/guest'
    }
  },
  {
    id: 4,
    username: 'Catherine',
    password: 'catherine@123',
    email: 'catherine@demo.com',
    authToken: 'auth-token-8f3ae836da744329a6f93bf20594b5cc',
    authRole: 'customer',
    refreshToken: 'auth-token-f8c137a2c98743f48b643e71161d90aa',
    roles: [1], // Administrator
    pic: toAbsoluteUrl('/media/users/300_21.jpg'),
    fullname: 'Catherine Lee',
    firstname: 'Catherine',
    lastname: 'Lee',
    occupation: 'Customer',
    companyName: 'Keenthemes',
    phone: '456669067890',
    language: 'en',
    timeZone: 'International Date Line West',
    website: 'https://keenthemes.com',
    emailSettings: {
      emailNotification: true,
      sendCopyToPersonalEmail: false,
      activityRelatesEmail: {
        youHaveNewNotifications: false,
        youAreSentADirectMessage: false,
        someoneAddsYouAsAsAConnection: true,
        uponNewOrder: false,
        newMembershipApproval: false,
        memberRegistration: true
      },
      updatesFromKeenthemes: {
        newsAboutKeenthemesProductsAndFeatureUpdates: false,
        tipsOnGettingMoreOutOfKeen: false,
        thingsYouMissedSindeYouLastLoggedIntoKeen: true,
        newsAboutMetronicOnPartnerProductsAndOtherServices: true,
        tipsOnMetronicBusinessProducts: true
      }
    },
    communication: {
      email: true,
      sms: true,
      phone: false
    },
    address: {
      addressLine: 'L-12-20 Vertex, Cybersquare',
      city: 'San Francisco',
      state: 'California',
      postCode: '45000'
    },
    socialNetworks: {
      linkedIn: 'https://linkedin.com/admin',
      facebook: 'https://facebook.com/admin',
      twitter: 'https://twitter.com/admin',
      instagram: 'https://instagram.com/admin'
    }
  },
  {
    id: 5,
    username: 'Helen Rose',
    password: 'helen@123',
    email: 'helen@demo.com',
    authToken: 'auth-token-6829bba69dd3421d8762-991e9e806dbf',
    authRole: 'broker',
    refreshToken: 'auth-token-f8e4c61a318e4d618b6c199ef96b9e55',
    roles: [2], // Manager
    pic: toAbsoluteUrl('/media/users/100_2.jpg'),
    fullname: 'Helen Rose',
    firstname: 'Helen',
    lastname: 'Rose',
    occupation: 'Broker',
    companyName: 'Keenthemes',
    phone: '456669067891',
    language: 'en',
    timeZone: 'International Date Line West',
    communication: {
      email: true,
      sms: true,
      phone: false
    },
    emailSettings: {
      emailNotification: true,
      sendCopyToPersonalEmail: false,
      activityRelatesEmail: {
        youHaveNewNotifications: false,
        youAreSentADirectMessage: false,
        someoneAddsYouAsAsAConnection: true,
        uponNewOrder: false,
        newMembershipApproval: false,
        memberRegistration: true
      },
      updatesFromKeenthemes: {
        newsAboutKeenthemesProductsAndFeatureUpdates: false,
        tipsOnGettingMoreOutOfKeen: false,
        thingsYouMissedSindeYouLastLoggedIntoKeen: true,
        newsAboutMetronicOnPartnerProductsAndOtherServices: true,
        tipsOnMetronicBusinessProducts: true
      }
    },
    address: {
      addressLine: '3487  Ingram Road',
      city: 'Greensboro',
      state: 'North Carolina',
      postCode: '27409'
    },
    socialNetworks: {
      linkedIn: 'https://linkedin.com/user',
      facebook: 'https://facebook.com/user',
      twitter: 'https://twitter.com/user',
      instagram: 'https://instagram.com/user'
    }
  },
  {
    id: 6,
    username: 'Bill Robbie',
    password: 'bill@123',
    email: 'bill@demo.com',
    authToken: 'auth-token-d2dff7b82f784de584b60964abbe45b9',
    authRole: 'agent',
    refreshToken: 'auth-token-c999ccfe74aa40d0aa1a64c5e620c1a5',
    roles: [3], // Guest
    pic: toAbsoluteUrl('/media/users/default.jpg'),
    fullname: 'Bill Robbie',
    firstname: 'Bill',
    lastname: 'Robbie',
    occupation: 'Agent',
    companyName: 'Keenthemes',
    phone: '456669067892',
    language: 'en',
    timeZone: 'International Date Line West',
    communication: {
      email: true,
      sms: true,
      phone: false
    },
    emailSettings: {
      emailNotification: true,
      sendCopyToPersonalEmail: false,
      activityRelatesEmail: {
        youHaveNewNotifications: false,
        youAreSentADirectMessage: false,
        someoneAddsYouAsAsAConnection: true,
        uponNewOrder: false,
        newMembershipApproval: false,
        memberRegistration: true
      },
      updatesFromKeenthemes: {
        newsAboutKeenthemesProductsAndFeatureUpdates: false,
        tipsOnGettingMoreOutOfKeen: false,
        thingsYouMissedSindeYouLastLoggedIntoKeen: true,
        newsAboutMetronicOnPartnerProductsAndOtherServices: true,
        tipsOnMetronicBusinessProducts: true
      }
    },
    address: {
      addressLine: '1467  Griffin Street',
      city: 'Phoenix',
      state: 'Arizona',
      postCode: '85012'
    },
    socialNetworks: {
      linkedIn: 'https://linkedin.com/guest',
      facebook: 'https://facebook.com/guest',
      twitter: 'https://twitter.com/guest',
      instagram: 'https://instagram.com/guest'
    }
  }
]

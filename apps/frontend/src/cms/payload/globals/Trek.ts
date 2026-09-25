import { createSiteGlobal } from './siteGlobal'

/** Copy for the trekking site (trek.<domain>). */
export const Trek = createSiteGlobal({
  slug: 'trek',
  label: 'Trek site',
  title: 'Trek',
  tagline: 'Himalayan trails, long walks and the gear that survives them',
  about:
    'Away from the screen I walk. This is where the <strong>trails, passes and altitude</strong> live — the routes I have covered in Nepal and beyond, what the days actually looked like, and the photographs and films that came back with me.',
  aboutHint: 'Trekking focus: routes, altitude, gear, what the walking is like.',
  nav: [
    { name: 'Home', href: '/#hero' },
    { name: 'About', href: '/#about' },
    { name: 'Photos', href: '/#photos' },
    { name: 'Films', href: '/#videos' },
    { name: 'Treks', href: '/#experience' },
    { name: 'Skills', href: '/#skills' },
    { name: 'Contact', href: '/#contact' },
  ],
})

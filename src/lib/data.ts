export const LEADS = [
  { id: 1, name: 'Reyes Media Group',   source: 'Upwork',      service: 'Shopify Dev',    status: 'contacted',     assigned: 'Sales',  value: 3800 },
  { id: 2, name: 'Nova Fitness Co.',    source: 'Fiverr',      service: 'Landing Page',   status: 'new',           assigned: 'VA',     value: 900  },
  { id: 3, name: 'Bloom CRE',          source: 'Referral',    service: 'CRM Setup',      status: 'proposal-sent', assigned: 'Sales',  value: 2400 },
  { id: 4, name: 'Stark Solutions',    source: 'Website',     service: 'Automation',     status: 'closed-won',    assigned: 'Dev',    value: 3200 },
  { id: 5, name: 'Apex Roofing',       source: 'Facebook',    service: 'Lead Gen',       status: 'new',           assigned: 'VA',     value: 1600 },
  { id: 6, name: 'Prism Digital',      source: 'Upwork',      service: 'CRM Setup',      status: 'contacted',     assigned: 'CRM',    value: 2800 },
  { id: 7, name: 'Cascade Marketing',  source: 'Freelancer',  service: 'Shopify Dev',    status: 'new',           assigned: 'Sales',  value: 4200 },
]

export const PROPOSALS = [
  { id: 1, client: 'Bloom CRE',       template: 'CRM Setup & Config',    value: 2400, sent: 'May 15', status: 'awaiting' },
  { id: 2, client: 'Reyes Media',     template: 'Shopify Store Build',   value: 3800, sent: 'May 17', status: 'sent'     },
  { id: 3, client: 'Nova Fitness',    template: 'Landing Page Design',   value: 900,  sent: 'May 18', status: 'sent'     },
  { id: 4, client: 'Stark Solutions', template: 'Automation Workflow',   value: 3200, sent: 'May 10', status: 'accepted' },
  { id: 5, client: 'Cascade Mktg',   template: 'Shopify Store Build',   value: 4200, sent: 'May 8',  status: 'draft'    },
]

export const TEMPLATES = [
  { id: 1, name: 'Shopify Store Build',   category: 'Web Dev',    lastUsed: '3 days ago',  status: 'active' },
  { id: 2, name: 'CRM Setup & Config',    category: 'CRM',        lastUsed: '1 week ago',  status: 'active' },
  { id: 3, name: 'Automation Workflow',   category: 'Automation', lastUsed: '2 weeks ago', status: 'active' },
  { id: 4, name: 'Landing Page Design',   category: 'Design',     lastUsed: '2 weeks ago', status: 'active' },
  { id: 5, name: 'Lead Generation Pkg',   category: 'Marketing',  lastUsed: '1 month ago', status: 'draft'  },
  { id: 6, name: 'Full Agency Retainer',  category: 'Retainer',   lastUsed: 'Never',       status: 'draft'  },
]

export const TRANSACTIONS = [
  { id: 1, party: 'Stark Solutions',  type: 'Project',   amount: 3800,  date: 'May 17', status: 'received', direction: 'in'  },
  { id: 2, party: 'Nova Fitness Co.', type: 'Retainer',  amount: 600,   date: 'May 16', status: 'received', direction: 'in'  },
  { id: 3, party: 'Dev Contractor',   type: 'Payout',    amount: 1200,  date: 'May 15', status: 'paid',     direction: 'out' },
  { id: 4, party: 'Bloom CRE',        type: 'Project',   amount: 2400,  date: 'May 12', status: 'pending',  direction: 'in'  },
  { id: 5, party: 'Apex Roofing',     type: 'Project',   amount: 1600,  date: 'May 10', status: 'invoiced', direction: 'in'  },
  { id: 6, party: 'VA Contractor',    type: 'Payout',    amount: 900,   date: 'May 8',  status: 'paid',     direction: 'out' },
  { id: 7, party: 'Prism Digital',    type: 'Retainer',  amount: 1200,  date: 'May 5',  status: 'received', direction: 'in'  },
]

export const TEAM = [
  { id: '1', name: 'Terry Pugh',       role: 'founder',   title: 'Founder & Ops Director', pay: 'Owner draw',          initials: 'TP', color: 'blue'   },
  { id: '2', name: 'Sales Closer',     role: 'sales',     title: 'Sales Closer',           pay: '15% commission',      initials: 'SC', color: 'green'  },
  { id: '3', name: 'Web Developer',    role: 'developer', title: 'Web Developer',          pay: 'Per project',         initials: 'WD', color: 'amber'  },
  { id: '4', name: 'CRM Specialist',   role: 'crm',       title: 'CRM Specialist',         pay: 'Per milestone',       initials: 'CS', color: 'purple' },
  { id: '5', name: 'Graphic Designer', role: 'designer',  title: 'Graphic Designer',       pay: 'Per asset/package',   initials: 'GD', color: 'pink'   },
  { id: '6', name: 'Lead Gen VA',      role: 'va',        title: 'Lead Generation VA',     pay: 'Base + bonuses',      initials: 'VA', color: 'slate'  },
]

export const SOURCES = [
  { name: 'Upwork',       count: 7, pct: 70 },
  { name: 'Fiverr',       count: 3, pct: 30 },
  { name: 'Facebook',     count: 2, pct: 20 },
  { name: 'Freelancer',   count: 1, pct: 10 },
  { name: 'Website',      count: 1, pct: 10 },
  { name: 'Referral',     count: 1, pct: 10 },
]

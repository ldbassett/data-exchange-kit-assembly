export const ITEMS = [
  {id:'editor_badge', name:'Editor Badge'},
  {id:'script_tome', name:'Script Tome'},
  {id:'data_cartridge', name:'Data Cartridge'},
  {id:'cloud_key', name:'Cloud Key'},
  {id:'dash_lens', name:'Dash Lens'},
  {id:'stream_relay', name:'Stream Relay'},
  {id:'secure_token', name:'Secure Token'},
  {id:'tunnel_chip', name:'Tunnel Chip'},
  {id:'notebook_folio', name:'Notebook Folio'},
  {id:'workshop_wrench', name:'Workshop Wrench'},
  {id:'team_pin', name:'Team Comms Pin'},
  {id:'power_flask', name:'Power Flask'}
]

export const RECIPES = [
  {id:'electric_works', name:'Light up Electric Works Dashboard', items:['dash_lens','data_cartridge','cloud_key'], points:180},
  {id:'three_rivers', name:'Three Rivers Telemetry', items:['stream_relay','dash_lens','workshop_wrench'], points:220},
  {id:'old_fort', name:'Fortify the Old Fort', items:['secure_token','tunnel_chip','team_pin'], points:190},
  {id:'appleseed', name:'Johnny Appleseed Archive', items:['notebook_folio','data_cartridge','cloud_key'], points:170},
  {id:'summit_ship', name:'Summit City Ship-It', items:['script_tome','editor_badge','workshop_wrench'], points:210},
  {id:'tincaps_demo', name:'TinCaps Show-n-Tell', items:['dash_lens','team_pin','notebook_folio','power_flask'], points:160},
  {id:'hoosier_hyperloop', name:'Hoosier Hyperloop', items:['editor_badge','script_tome','data_cartridge','cloud_key','dash_lens','stream_relay','secure_token','tunnel_chip'], points:500}
]

export const TIME_TOKENS = [
  {id:'+5', seconds:5},
  {id:'+15', seconds:15},
  {id:'+30', seconds:30}
]

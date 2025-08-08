
export const THEME = {
  primary: "#1f6feb",
  accent: "#ffd200",
  city: "Fort Wayne"
};

export const ITEMS = [
  {id:"airpods", name:"AirPods Pro", tags:["audio","focus"]},
  {id:"standing_desk", name:"Standing Desk", tags:["ergonomics","focus"]},
  {id:"mech_kb", name:"Mechanical Keyboard", tags:["typing","dev"]},
  {id:"ergo_mouse", name:"Ergo Mouse", tags:["ergonomics"]},
  {id:"ultrawide", name:"Ultra-Wide Monitor", tags:["viz","productivity"]},
  {id:"coldbrew", name:"Cold Brew", tags:["focus","energy"]},
  {id:"stickies", name:"Sticky Notes", tags:["planning"]},
  {id:"marker", name:"Whiteboard Marker", tags:["planning","collab"]},
  {id:"figma", name:"Figma", tags:["design","viz","collab"]},
  {id:"notion", name:"Notion", tags:["notes","planning","knowledge"]},
  {id:"slack", name:"Slack", tags:["collab","comms"]},
  {id:"github", name:"GitHub", tags:["dev","versioning","collab"]},
  {id:"python", name:"Python", tags:["dev","data"]},
  {id:"node", name:"Node.js", tags:["dev"]},
  {id:"jupyter", name:"Jupyter Notebook", tags:["data","analysis","viz"]},
  {id:"pandas", name:"Pandas", tags:["data","analysis"]},
  {id:"grafana", name:"Grafana", tags:["viz","metrics","ops"]},
  {id:"s3", name:"S3 Bucket", tags:["cloud","storage"]},
  {id:"postgres", name:"PostgreSQL", tags:["data","db"]},
  {id:"kafka", name:"Kafka", tags:["data","streaming"]},
  {id:"docker", name:"Docker", tags:["dev","ops"]},
  {id:"k8s", name:"Kubernetes", tags:["ops","cloud"]},
  {id:"cicd", name:"CI/CD Pipeline", tags:["ops","automation"]},
  {id:"chatgpt", name:"ChatGPT Pro", tags:["ai","assist"]},
  {id:"pw_manager", name:"Password Manager", tags:["security"]},
  {id:"vpn", name:"VPN", tags:["security","remote"]},
  {id:"portable_ssd", name:"Portable SSD", tags:["storage","productivity"]},
  {id:"miro", name:"Miro", tags:["design","planning","collab"]},
  {id:"vscode", name:"VS Code", tags:["dev"]},
  {id:"postman", name:"Postman", tags:["dev","testing","api"]}
];

export const TASKS = [
  {id:"landing", name:"Ship a Landing Page", requires:{ anyTags:[["dev"],["versioning"],["design","notes"]] }, points:120, sticker:"TinCaps Launch"},
  {id:"datalake", name:"Spin Up a Data Lake Drop", requires:{ anyTags:[["cloud","storage"],["data"]] }, points:110, sticker:"Maumee Mixer"},
  {id:"realtimedash", name:"Real-Time Dash", requires:{ anyTags:[["streaming"],["viz"],["ops"]] }, points:180, sticker:"Three Rivers Telemetry"},
  {id:"nb2insight", name:"Notebook to Insight", requires:{ anyTags:[["analysis"],["viz","db"]] }, points:130, sticker:"Electric Works Eureka"},
  {id:"secure_sprint", name:"Secure Remote Sprint", requires:{ anyItems:[["vpn"],["pw_manager"]], anyTags:[["collab"]] }, points:140, sticker:"Old Fort Firewall"},
  {id:"zero_api", name:"Zero-to-API", requires:{ anyTags:[["dev"],["ops"],["versioning"]] }, points:160, sticker:"St. Marys Service"},
  {id:"obs101", name:"Observability 101", requires:{ anyTags:[["metrics"],["storage"],["ops"]] }, points:150, sticker:"Headwaters Healthcheck"},
  {id:"protofast", name:"Prototype, but Faster", requires:{ anyTags:[["ai"],["dev"],["notes","planning"]] }, points:125, sticker:"Mastodon Momentum"},
  {id:"design_review", name:"Team Design Review", requires:{ anyTags:[["design"],["collab"],["comms"]] }, points:90, sticker:"Downtown Designwalk"},
  {id:"data2dash", name:"Data to Dashboard", requires:{ anyTags:[["db"],["analysis"],["viz"]] }, points:170, sticker:"Confluence Convergence"},
  {id:"harden", name:"Harden the Perimeter", requires:{ anyTags:[["security"],["ops"]] }, points:120, sticker:"Fortified Fort Wayne"},
  {id:"cicd_task", name:"Continuous Delivery", requires:{ anyTags:[["dev"],["versioning"],["automation"]] }, points:160, sticker:"Superior Ship-It"},
  {id:"deepwork", name:"Deep Work Streak", requires:{ anyTags:[["focus","focus"],["ergonomics"]] }, points:80, sticker:"Rudolf Runner"},
  {id:"knowledge", name:"Knowledge Garden", requires:{ anyTags:[["notes"],["planning"],["collab"]] }, points:70, sticker:"Johnny Appleseed Wiki"},
  {id:"stream_ingest", name:"Stream Ingest", requires:{ anyTags:[["streaming"],["storage"],["db"]] }, points:175, sticker:"Maumee Intake"},
  {id:"containerize", name:"Containerize Everything", requires:{ anyTags:[["dev"],["ops"],["cloud","automation"]] }, points:150, sticker:"Summit City Stack"},
  {id:"incident", name:"Incident Averted", requires:{ anyTags:[["metrics"],["comms"],["ops"]] }, points:140, sticker:"Allen County On-Call"},
  {id:"demo", name:"Pitch-Perfect Demo", requires:{ anyTags:[["viz"],["audio"],["planning"]] }, points:95, sticker:"TinCaps Show-n-Tell"}
];

export const BONUSES = [
  {name:"Auto-Explainer Panels", anyItems:["chatgpt","jupyter","grafana"], points:25},
  {name:"Design-Dev Handshake", anyItems:["figma","notion","github"], points:20},
  {name:"Hybrid Lakehouse", anyItems:["s3","postgres","pandas"], points:30},
  {name:"Clack-Clack Flow", anyItems:["airpods","coldbrew","mech_kb"], points:15},
  {name:"Local Dev Speedrun", anyItems:["vscode","docker","postman"], points:25}
];

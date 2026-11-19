/* ================= data ================= */
const GENRE_OF={'Massive Attack':'Electronic','Phoebe Bridgers':'Indie','Turnstile':'Rock','Bad Gyal':'Latin','Doechii':'Hip-hop','Robyn':'Pop','Fontaines D.C.':'Indie','FKA twigs':'R&B','The Chemical Brothers':'Electronic','Hayley Williams':'Rock','Pavement':'Indie','Skrillex b2b Ninajirachi':'Electronic','Bonobo':'Electronic','Romy':'Electronic','Yung Lean':'Hip-hop','Tokischa':'Latin','Jessie Ware':'Pop','Peggy Gou':'Techno','Carl Cox':'Techno',
 'Tame Impala':'Indie','Rosalía':'Latin','Fred again..':'Electronic','Arctic Monkeys':'Rock','Bad Bunny':'Latin','Charli xcx':'Pop','Kendrick Lamar':'Hip-hop','Billie Eilish':'Pop','SZA':'R&B','Charlotte de Witte':'Techno'};
const GENRES=['Indie','Electronic','Techno','Hip-hop','Pop','Rock','Latin','R&B'];
const FAVS=['Tame Impala','Rosalía','Fred again..','Arctic Monkeys','Bad Bunny','Charli xcx','Kendrick Lamar','Billie Eilish','SZA','Charlotte de Witte'];
const FESTS=[
  {id:'primavera',name:'Primavera Sound',short:'PS',city:'Barcelona',venue:'Parc del Fòrum',dates:'3–5 June 2027',start:'2027-06-03',colors:['#FF6A3D','#7B4DFF'],
   lineup:[['Massive Attack','Thu'],['Phoebe Bridgers','Thu'],['Turnstile','Thu'],['Bad Gyal','Thu'],['Doechii','Fri'],['Robyn','Fri'],['Fontaines D.C.','Fri'],['FKA twigs','Fri'],['The Chemical Brothers','Sat'],['Hayley Williams','Sat'],['Pavement','Sat'],['Skrillex b2b Ninajirachi','Sat']]},
  {id:'sonar',name:'Sónar',short:'SÓ',city:'Barcelona',venue:'By Day: seafront · By Night: Fira Gran Via',dates:'17–19 June 2027',start:'2027-06-17',colors:['#2A2560','#3B7BFF'],
   lineup:[['Bonobo','Thu'],['Romy','Thu'],['Yung Lean','Fri'],['Tokischa','Fri'],['Jessie Ware','Fri'],['Peggy Gou','Sat'],['Carl Cox','Sat']]},
  {id:'cruilla',name:'Cruïlla',short:'CR',city:'Barcelona',venue:'Parc del Fòrum',dates:'7–10 July 2027',start:'2027-07-07',colors:['#FFB800','#FF4D6D'],lineup:[]},
  {id:'madcool',name:'Mad Cool',short:'MC',city:'Madrid',venue:'Iberdrola Music, Villaverde',dates:'July 2027 · dates TBC',start:null,colors:['#1FB57A','#145C4A'],lineup:[]},
];
const TIMES=['19:00','20:30','20:30','22:15'];
const STAGES=['Main stage','Stage 2','Stage 3','Main stage'];
const SPOTS={primavera:'Bar on Rambla del Poblenou',sonar:'Café by Plaça d\'Espanya',cruilla:'Bar on Rambla del Poblenou',madcool:'Bar near Plaza de Legazpi'};
const artistsFor=f=>f.lineup.length?f.lineup.map(a=>a[0]):FAVS;

function pool(f){
  const A=artistsFor(f);
  return [
    {id:f.id+'-g1',type:'group',name:'The Night Owls',size:4,verified:true,faces:['MP','JV','LD','AO'],members:['Marta','Jordi','Léa','Amara'],
     line:'4 going · meet at a CREW Spot',chips:['Arrive early','Front half'],artists:[A[0],A[4]||A[1],A[2]],approval:false,
     bio:'Meeting for a drink before the gates, then straight to the front.'},
    {id:f.id+'-p1',type:'person',name:'Lucía',age:21,verified:true,from:'Barcelona',solo:true,chips:['First festival','Going solo'],artists:[A[4]||A[1],A[5]||A[2]],
     bio:'Erasmus at UB. Nobody in my class likes this music, so here I am.'},
    {id:f.id+'-g2',type:'group',name:'Erasmus BCN',size:6,verified:true,faces:['TK','EJ','NB','SR'],members:['Tomás','Emma','Noah','Sofia'],
     line:'6 going · English speaking',chips:['Chill','Budget','Metro together'],artists:[A[1],A[6]||A[3]],approval:true,
     bio:'International students. We meet on the metro and go in together.'},
    {id:f.id+'-p2',type:'person',name:'Noah',age:24,verified:true,from:'Berlin',solo:true,chips:['Flying in','Going solo'],artists:[A[0],A[2]],
     bio:'Coming for the weekend, staying in Poblenou. Looking for people to go with.'},
    {id:f.id+'-g3',type:'group',name:'Girls Go Too',size:5,verified:true,women:true,faces:['IC','AO','ES','MV'],members:['Inês','Amara','Elena','Marina'],
     line:'5 going · women only',chips:['Women only','Stay together'],artists:[A[5]||A[1],A[7]||A[3],A[3]],approval:true,
     bio:'Small group, everyone verified. We stick together after dark.'},
    {id:f.id+'-p3',type:'person',name:'Jordi',age:19,verified:false,from:'Sabadell',solo:false,chips:['Low budget'],artists:[A[3]],
     bio:'Two friends dropped out last minute. Have a spare day pass at face value.'},
  ];
}
const REPLIES=['Same here','Who\'s bringing snacks?','Can\'t wait','Let\'s do it','Good shout','I\'ll be there a bit early','Anyone taking the metro?'];
const ICE=['Which set are you not missing?','First festival you ever went to?','Glitter, bucket hat or full costume?','Best festival food you ever had?','Song that always gets you dancing?'];
const SONGS={'Massive Attack':'Teardrop','Phoebe Bridgers':'Motion Sickness','Turnstile':'Mystery','Bad Gyal':'Fiebre','Doechii':'Denial Is a River','Robyn':'Dancing On My Own','Fontaines D.C.':'Starburster','FKA twigs':'Eusexua','The Chemical Brothers':'Galvanize','Hayley Williams':'Simmer','Pavement':'Cut Your Hair','Bonobo':'Kerala','Romy':'Loveher','Yung Lean':'Ginseng Strip 2002','Tokischa':'Linda','Jessie Ware':'Free Yourself','Peggy Gou':'(It Goes Like) Nanana','Carl Cox':'I Want You (Forever)','Tame Impala':'The Less I Know the Better','Rosalía':'Despechá','Fred again..':'Delilah','Arctic Monkeys':'505','Bad Bunny':'Tití Me Preguntó','Charli xcx':'360','Kendrick Lamar':'Alright','Billie Eilish':'Birds of a Feather','SZA':'Kill Bill','Charlotte de Witte':'Overdrive'};
const FOOD=[
  {s:'Burgers',items:[['Classic burger',9],['Veggie burger',9],['Fries',4]]},
  {s:'Pizza',items:[['Margherita slice',5],['Pepperoni slice',6]]},
  {s:'Drinks',items:[['Water 50cl',2],['Soft drink',3.5],['Beer',6]]},
];
const MISSIONS=[
  {id:'join',label:'Join 2 crews',goal:2,pts:100},
  {id:'msgs',label:'Send 10 messages in your crews',goal:10,pts:50},
  {id:'polls',label:'Create a poll',goal:1,pts:50},
  {id:'songs',label:'Add 3 songs to a crew playlist',goal:3,pts:75},
  {id:'plan',label:'Save 5 sets to your plan',goal:5,pts:50},
  {id:'safe',label:'Do a safe check-in',goal:1,pts:100},
];
const SEEDFEED=[
  {id:'f1',crew:'The Night Owls',who:'Marta',cap:'Last year, front row. This year we need more people.',g:'linear-gradient(150deg,#FF6A3D,#7B4DFF)',likes:24},
  {id:'f2',crew:'Erasmus BCN',who:'Tomás',cap:'Crew dinner before the lineup drop 🍕',g:'linear-gradient(150deg,#FFB800,#FF4D6D)',likes:11},
  {id:'f3',crew:'Girls Go Too',who:'Inês',cap:'Matching bucket hats arrived.',g:'linear-gradient(150deg,#1FB57A,#3B7BFF)',likes:37},
];

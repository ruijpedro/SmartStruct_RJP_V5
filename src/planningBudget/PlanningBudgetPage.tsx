import React,{useMemo,useState} from 'react'
import {loadBIMModel} from '../../engineering/bim/model'

type Row={id:number;code:string;phase:string;work:string;unit:string;qty:number;unitPrice:number;duration:number;start:number;dependency:string}
const seed:Row[]=[
{id:1,code:'01.01',phase:'Preparação',work:'Estaleiro, implantação e segurança inicial',unit:'vg',qty:1,unitPrice:3500,duration:5,start:0,dependency:'—'},
{id:2,code:'02.01',phase:'Movimento de terras',work:'Escavações e preparação de plataforma',unit:'m³',qty:120,unitPrice:18,duration:6,start:5,dependency:'01.01'},
{id:3,code:'03.01',phase:'Fundações',work:'Sapatas, vigas de fundação e betão de limpeza',unit:'m³',qty:22,unitPrice:185,duration:8,start:11,dependency:'02.01'},
{id:4,code:'04.01',phase:'Estrutura',work:'Estrutura resistente acima do solo',unit:'m²',qty:180,unitPrice:145,duration:20,start:19,dependency:'03.01'},
{id:5,code:'05.01',phase:'Alvenarias',work:'Paredes exteriores e interiores',unit:'m²',qty:260,unitPrice:48,duration:14,start:32,dependency:'04.01'},
{id:6,code:'06.01',phase:'Coberturas',work:'Estrutura, revestimento, isolamento e drenagem',unit:'m²',qty:120,unitPrice:95,duration:10,start:36,dependency:'04.01'},
{id:7,code:'07.01',phase:'Instalações',work:'Águas, esgotos, eletricidade e equipamentos',unit:'m²',qty:180,unitPrice:120,duration:18,start:43,dependency:'05.01'},
{id:8,code:'08.01',phase:'Revestimentos',work:'Rebocos, pavimentos, tetos e pinturas',unit:'m²',qty:500,unitPrice:32,duration:20,start:55,dependency:'05.01'},
{id:9,code:'09.01',phase:'Caixilharias',work:'Portas, janelas e serralharias',unit:'vg',qty:1,unitPrice:14500,duration:10,start:54,dependency:'05.01'},
{id:10,code:'10.01',phase:'Arranjos exteriores',work:'Pavimentos exteriores, drenagem e acabamentos',unit:'vg',qty:1,unitPrice:8500,duration:10,start:72,dependency:'07.01'},
]
const money=(v:number)=>v.toLocaleString('pt-PT',{style:'currency',currency:'EUR'})
export default function PlanningBudgetPage(){
 const[rows,setRows]=useState<Row[]>(()=>{try{return JSON.parse(localStorage.getItem('smartstruct:budget')||'null')||seed}catch{return seed}})
 const bim=loadBIMModel()
 const total=useMemo(()=>rows.reduce((a,r)=>a+r.qty*r.unitPrice,0),[rows])
 const maxDay=useMemo(()=>Math.max(1,...rows.map(r=>r.start+r.duration)),[rows])
 const update=(id:number,k:keyof Row,v:string)=>setRows(rs=>{const out=rs.map(r=>r.id===id?{...r,[k]:['qty','unitPrice','duration','start'].includes(k)?Number(v):v}:r);localStorage.setItem('smartstruct:budget',JSON.stringify(out));return out})
 const add=()=>setRows(rs=>{const n=Math.max(0,...rs.map(r=>r.id))+1,out=[...rs,{id:n,code:`${String(n).padStart(2,'0')}.01`,phase:'Nova fase',work:'Nova unidade de obra',unit:'vg',qty:1,unitPrice:0,duration:5,start:maxDay,dependency:'—'}];localStorage.setItem('smartstruct:budget',JSON.stringify(out));return out})
 const remove=(id:number)=>setRows(rs=>{const out=rs.filter(r=>r.id!==id);localStorage.setItem('smartstruct:budget',JSON.stringify(out));return out})
 const importBIM=()=>{if(!bim){alert('Não existe modelo BIM guardado.');return}const counts=bim.elements.reduce<Record<string,number>>((a,e)=>(a[e.type]=(a[e.type]||0)+1,a),{});const extra:Row[]=[];let id=Math.max(0,...rows.map(r=>r.id))+1
  const push=(phase:string,work:string,unit:string,qty:number,price:number)=>extra.push({id:id++,code:`BIM-${id}`,phase,work,unit,qty,unitPrice:price,duration:5,start:maxDay,dependency:'Modelo BIM'})
  if(counts.isolated_footing)push('Fundações','Sapatas identificadas no modelo BIM','un',counts.isolated_footing,420)
  if(counts.column)push('Estrutura','Pilares identificados no modelo BIM','un',counts.column,280)
  if(counts.beam)push('Estrutura','Vigas identificadas no modelo BIM','un',counts.beam,320)
  if(counts.wall)push('Alvenarias','Paredes identificadas no modelo BIM','un',counts.wall,250)
  if(counts.window)push('Caixilharias','Janelas identificadas no modelo BIM','un',counts.window,650)
  if(counts.door)push('Carpintarias','Portas identificadas no modelo BIM','un',counts.door,380)
  const out=[...rows,...extra];setRows(out);localStorage.setItem('smartstruct:budget',JSON.stringify(out))
 }
 return <div className="module-page planning-page"><div className="module-head"><div><h2>Planeamento de Execução e Orçamento</h2><p>Mapa de trabalhos editável, custos, durações, dependências e cronograma de execução ligado ao modelo BIM.</p></div><div className="bim-actions"><button onClick={importBIM}>Importar quantidades BIM</button><button onClick={()=>window.open('https://geradordeprecos.info/','_blank','noopener,noreferrer')}>Referência externa · Gerador de preços</button><button className="primary" onClick={add}>Adicionar trabalho</button></div></div>
 <div className="result-grid"><div className="metric"><span>Orçamento base</span><b>{money(total)}</b></div><div className="metric"><span>Prazo</span><b>{maxDay} dias</b></div><div className="metric"><span>Unidades de obra</span><b>{rows.length}</b></div><div className="metric"><span>BIM</span><b>{bim?`${bim.elements.length} elementos`:'Sem modelo'}</b></div></div>
 <section className="panel"><h3>Mapa de trabalhos e orçamento</h3><p className="note">Os preços são editáveis e constituem valores de estudo. A ligação ao Gerador de preços é uma referência externa; não é feita cópia automática da base de dados comercial.</p><div className="budget-table"><div className="budget-row head"><b>Código</b><b>Fase / Trabalho</b><b>Un.</b><b>Qtd.</b><b>Preço unit.</b><b>Total</b><b>Dias</b><b>Início</b><b/></div>{rows.map(r=><div className="budget-row" key={r.id}><input value={r.code} onChange={e=>update(r.id,'code',e.target.value)}/><div><input value={r.phase} onChange={e=>update(r.id,'phase',e.target.value)}/><input value={r.work} onChange={e=>update(r.id,'work',e.target.value)}/></div><input value={r.unit} onChange={e=>update(r.id,'unit',e.target.value)}/><input type="number" value={r.qty} onChange={e=>update(r.id,'qty',e.target.value)}/><input type="number" value={r.unitPrice} onChange={e=>update(r.id,'unitPrice',e.target.value)}/><b>{money(r.qty*r.unitPrice)}</b><input type="number" value={r.duration} onChange={e=>update(r.id,'duration',e.target.value)}/><input type="number" value={r.start} onChange={e=>update(r.id,'start',e.target.value)}/><button onClick={()=>remove(r.id)}>×</button></div>)}</div></section>
 <section className="panel"><h3>Planeamento · Gantt simplificado</h3><div className="gantt-head"><span>0</span><span>{Math.round(maxDay/2)} dias</span><span>{maxDay} dias</span></div><div className="gantt">{rows.map(r=><div className="gantt-row" key={r.id}><b>{r.code}</b><span>{r.phase}</span><div className="gantt-track"><i style={{left:`${100*r.start/maxDay}%`,width:`${Math.max(2,100*r.duration/maxDay)}%`}}/></div><small>{r.duration} d</small></div>)}</div></section>
 <section className="panel"><h3>Fluxo de obra</h3><div className="flow-line"><b>BIM / Medições</b><span>→</span><b>Unidades de obra</b><span>→</span><b>Preços</b><span>→</span><b>Orçamento</b><span>→</span><b>Planeamento</b><span>→</span><b>Controlo</b></div><p className="note">Preparado para evoluir para autos de medição, custos reais, desvios, recursos, subempreitadas e curva financeira.</p></section></div>
}

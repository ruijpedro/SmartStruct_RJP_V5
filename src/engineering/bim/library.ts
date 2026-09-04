import type {BIMElement,BIMElementType,BIMMaterialRef,SmartStructBIMModel} from './model'

export interface BIMLibraryItem{
 id:string; name:string; category:string; type:BIMElementType; description:string;
 geometry:Record<string,string|number|boolean|null>; material:BIMMaterialRef; tags:string[]
}
const concrete=(grade='C30/37'):BIMMaterialRef=>({id:`MAT-CONC-${grade.replace('/','-')}`,name:`Betão ${grade}`,family:'Betão',properties:{grade}})
const steel=(grade='S275'):BIMMaterialRef=>({id:`MAT-STEEL-${grade}`,name:`Aço ${grade}`,family:'Aço estrutural',properties:{grade}})
const timber=(grade='C24'):BIMMaterialRef=>({id:`MAT-TIMBER-${grade}`,name:`Madeira ${grade}`,family:'Madeira estrutural',properties:{grade}})
const ceramic=(name='Tijolo cerâmico'):BIMMaterialRef=>({id:`MAT-MASONRY-${name.replace(/\s+/g,'-').toUpperCase()}`,name,family:'Alvenaria',properties:{natureza:'cerâmica'}})
const masonryConcrete=(name='Bloco de betão'):BIMMaterialRef=>({id:`MAT-MASONRY-${name.replace(/\s+/g,'-').toUpperCase()}`,name,family:'Alvenaria',properties:{natureza:'betão'}})
const generic=(name:string,family:string):BIMMaterialRef=>({id:`MAT-${family}-${name}`.replace(/\s+/g,'-').toUpperCase(),name,family,properties:{}})

export const BIM_LIBRARY:BIMLibraryItem[]=[
 {id:'rc-column-30x30',name:'Pilar BA 30×30',category:'Betão armado',type:'column',description:'Pilar retangular de referência para edifícios.',geometry:{length:3,b:.30,h:.30},material:concrete(),tags:['pilar','betão','edifício']},
 {id:'rc-column-30x50',name:'Pilar BA 30×50',category:'Betão armado',type:'column',description:'Pilar retangular para ações superiores.',geometry:{length:3,b:.30,h:.50},material:concrete(),tags:['pilar','betão']},
 {id:'rc-beam-25x50',name:'Viga BA 25×50',category:'Betão armado',type:'beam',description:'Viga retangular de referência.',geometry:{length:5,b:.25,h:.50,axis:'X'},material:concrete(),tags:['viga','betão']},
 {id:'rc-beam-30x60',name:'Viga BA 30×60',category:'Betão armado',type:'beam',description:'Viga retangular para vãos/cargas superiores.',geometry:{length:6,b:.30,h:.60,axis:'X'},material:concrete(),tags:['viga','betão']},
 {id:'rc-slab-18',name:'Laje maciça 18 cm',category:'Betão armado',type:'slab',description:'Painel de laje maciça.',geometry:{width:5,depth:5,thickness:.18},material:concrete(),tags:['laje','betão']},
 {id:'footing-180',name:'Sapata 1,80×1,80',category:'Fundações',type:'isolated_footing',description:'Sapata isolada de referência.',geometry:{width:1.8,depth:1.8,height:.50},material:concrete(),tags:['sapata','fundação']},
 {id:'strip-footing',name:'Sapata contínua',category:'Fundações',type:'strip_footing',description:'Fundação contínua sob parede/alinhamento.',geometry:{width:6,depth:1,height:.45},material:concrete(),tags:['sapata','contínua']},
 {id:'raft',name:'Ensoleiramento geral',category:'Fundações',type:'raft_foundation',description:'Laje de fundação / ensoleiramento geral.',geometry:{width:10,depth:8,height:.45},material:concrete(),tags:['ensoleiramento','fundação']},
 {id:'pile-600',name:'Estaca Ø600',category:'Fundações profundas',type:'pile',description:'Estaca circular representada por prisma equivalente.',geometry:{width:.60,depth:.60,height:12},material:concrete(),tags:['estaca','profunda']},
 {id:'rc-wall-20',name:'Parede BA 20 cm',category:'Elementos verticais',type:'wall',description:'Parede estrutural / núcleo.',geometry:{width:5,depth:.20,height:3},material:concrete(),tags:['parede','núcleo']},
 {id:'steel-beam',name:'Viga metálica IPE 300',category:'Aço',type:'beam',description:'Representação BIM simplificada de viga metálica.',geometry:{length:6,b:.15,h:.30,axis:'X',profile:'IPE 300'},material:steel(),tags:['aço','IPE','viga']},
 {id:'steel-column',name:'Pilar metálico HEB 240',category:'Aço',type:'column',description:'Representação BIM simplificada de pilar metálico.',geometry:{length:3,b:.24,h:.24,profile:'HEB 240'},material:steel(),tags:['aço','HEB','pilar']},
 {id:'timber-beam',name:'Viga madeira 12×36',category:'Madeira',type:'beam',description:'Viga de madeira maciça/lamelada genérica.',geometry:{length:5,b:.12,h:.36,axis:'X'},material:timber(),tags:['madeira','viga']},
 {id:'masonry-wall-ceramic-15',name:'Parede alvenaria cerâmica 15 cm',category:'Alvenarias',type:'wall',description:'Parede de alvenaria de tijolo cerâmico para composição arquitetónica/BIM.',geometry:{width:4,depth:.15,height:2.7},material:ceramic('Tijolo cerâmico'),tags:['alvenaria','tijolo','parede','arquitetura']},
 {id:'masonry-wall-block-20',name:'Parede bloco de betão 20 cm',category:'Alvenarias',type:'wall',description:'Parede em bloco de betão para coordenação e estudo prévio.',geometry:{width:4,depth:.20,height:2.7},material:masonryConcrete(),tags:['alvenaria','bloco','betão','parede']},
 {id:'masonry-unit-ceramic',name:'Tijolo cerâmico 30×20×15',category:'Materiais · Alvenaria',type:'masonry_unit',description:'Unidade de alvenaria paramétrica para biblioteca de materiais.',geometry:{width:.30,depth:.15,height:.20},material:ceramic('Tijolo cerâmico'),tags:['tijolo','cerâmico','material','alvenaria']},
 {id:'masonry-unit-concrete',name:'Bloco betão 50×20×20',category:'Materiais · Alvenaria',type:'masonry_unit',description:'Bloco de betão paramétrico para biblioteca BIM.',geometry:{width:.50,depth:.20,height:.20},material:masonryConcrete(),tags:['bloco','betão','material','alvenaria']},
 {id:'tap-basin',name:'Torneira de lavatório',category:'Equipamentos sanitários',type:'plumbing_fixture',description:'Torneira monocomando genérica para coordenação BIM de instalações.',geometry:{width:.08,depth:.18,height:.22},material:generic('Cromado','Equipamento'),tags:['torneira','lavatório','água','sanitário']},
 {id:'tap-kitchen',name:'Misturadora de cozinha',category:'Equipamentos sanitários',type:'plumbing_fixture',description:'Misturadora de bancada/cozinha genérica.',geometry:{width:.10,depth:.24,height:.36},material:generic('Cromado','Equipamento'),tags:['torneira','cozinha','misturadora']},
 {id:'washbasin',name:'Lavatório 60 cm',category:'Equipamentos sanitários',type:'plumbing_fixture',description:'Lavatório sanitário genérico.',geometry:{width:.60,depth:.48,height:.18},material:generic('Cerâmica sanitária','Equipamento'),tags:['lavatório','sanitário','wc']},
 {id:'toilet',name:'Sanita',category:'Equipamentos sanitários',type:'plumbing_fixture',description:'Sanita genérica para composição BIM.',geometry:{width:.38,depth:.68,height:.78},material:generic('Cerâmica sanitária','Equipamento'),tags:['sanita','wc','sanitário']},
 {id:'shower-tray',name:'Base de duche 120×80',category:'Equipamentos sanitários',type:'plumbing_fixture',description:'Base de duche retangular.',geometry:{width:1.20,depth:.80,height:.08},material:generic('Base de duche','Equipamento'),tags:['duche','wc','sanitário']},
 {id:'sofa-3',name:'Sofá 3 lugares',category:'Mobiliário',type:'furniture',description:'Volume BIM genérico para sala de estar.',geometry:{width:2.10,depth:.90,height:.85},material:generic('Tecido','Mobiliário'),tags:['sofá','sala','mobiliário']},
 {id:'table-dining',name:'Mesa de jantar 180×90',category:'Mobiliário',type:'furniture',description:'Mesa retangular genérica.',geometry:{width:1.80,depth:.90,height:.75},material:generic('Madeira','Mobiliário'),tags:['mesa','jantar','mobiliário']},
 {id:'chair',name:'Cadeira',category:'Mobiliário',type:'furniture',description:'Cadeira genérica para composição BIM.',geometry:{width:.48,depth:.52,height:.90},material:generic('Madeira','Mobiliário'),tags:['cadeira','mobiliário']},
 {id:'bed-double',name:'Cama casal 160×200',category:'Mobiliário',type:'furniture',description:'Cama de casal genérica.',geometry:{width:1.60,depth:2.00,height:.55},material:generic('Madeira/Tecido','Mobiliário'),tags:['cama','quarto','mobiliário']},
 {id:'wardrobe',name:'Roupeiro 240×60',category:'Mobiliário',type:'furniture',description:'Roupeiro genérico de parede.',geometry:{width:2.40,depth:.60,height:2.40},material:generic('Madeira','Mobiliário'),tags:['roupeiro','armário','mobiliário']},
 {id:'door-90',name:'Porta interior 90 cm',category:'Arquitetura',type:'door',description:'Porta interior genérica.',geometry:{width:.90,depth:.08,height:2.10},material:generic('Madeira','Carpintaria'),tags:['porta','arquitetura']},
 {id:'window-120',name:'Janela 120×120',category:'Arquitetura',type:'window',description:'Janela genérica para composição de fachadas.',geometry:{width:1.20,depth:.12,height:1.20},material:generic('Alumínio/Vidro','Caixilharia'),tags:['janela','fachada','arquitetura']},
 {id:'retaining-wall',name:'Muro de contenção',category:'Geotecnia',type:'wall',description:'Muro de contenção conceptual para coordenação BIM.',geometry:{width:8,depth:.35,height:4},material:concrete(),tags:['muro','contenção','geotecnia']},
 {id:'roof-tile-ceramic',name:'Telha cerâmica',category:'Coberturas',type:'material',description:'Revestimento descontínuo para coberturas inclinadas.',geometry:{width:.30,depth:.45,height:.04},material:generic('Telha cerâmica','Cobertura'),tags:['telha','cobertura','inclinada']},
 {id:'roof-sandwich',name:'Painel sandwich cobertura',category:'Coberturas',type:'material',description:'Painel metálico isolado para cobertura.',geometry:{width:1,depth:3,height:.08},material:generic('Painel sandwich','Cobertura'),tags:['chapa','painel','isolamento','cobertura']},
 {id:'roof-gutter',name:'Caleira metálica',category:'Drenagem de coberturas',type:'pipe',description:'Caleira de recolha de águas pluviais.',geometry:{width:.15,depth:3,height:.12,diameter:.15},material:generic('Aço lacado','Drenagem'),tags:['caleira','pluvial','drenagem']},
 {id:'roof-downpipe',name:'Tubo de queda Ø110',category:'Drenagem de coberturas',type:'pipe',description:'Tubo vertical para águas pluviais.',geometry:{width:.11,depth:.11,height:3,diameter:.11},material:generic('PVC','Drenagem'),tags:['tubo de queda','pluvial','drenagem']},
 {id:'roof-drain',name:'Ralo de cobertura',category:'Drenagem de coberturas',type:'plumbing_fixture',description:'Ralo para cobertura plana com ligação à rede pluvial.',geometry:{width:.25,depth:.25,height:.12},material:generic('Ralo','Drenagem'),tags:['ralo','cobertura plana','pluvial']},
 {id:'roof-flashing',name:'Rufo e remate',category:'Coberturas',type:'material',description:'Remate de encontros, platibandas e emergências.',geometry:{width:.30,depth:2,height:.02},material:generic('Zinco/Titânio','Cobertura'),tags:['rufo','remate','platibanda']},
 {id:'roof-insulation',name:'Isolamento PIR 80 mm',category:'Coberturas',type:'material',description:'Camada térmica de cobertura.',geometry:{width:1,depth:2,height:.08},material:generic('PIR','Isolamento'),tags:['isolamento','PIR','cobertura']},
 {id:'roof-membrane',name:'Membrana PVC/TPO',category:'Impermeabilização',type:'material',description:'Impermeabilização para cobertura plana.',geometry:{width:2,depth:3,height:.002},material:generic('PVC/TPO','Impermeabilização'),tags:['membrana','impermeabilização','cobertura plana']},
 {id:'roof-skylight',name:'Claraboia 100×100',category:'Coberturas',type:'window',description:'Claraboia para iluminação/ventilação zenital.',geometry:{width:1,depth:1,height:.15},material:generic('Alumínio/Vidro','Caixilharia'),tags:['claraboia','cobertura','janela']},
 {id:'roof-solar',name:'Painel solar',category:'Equipamentos de cobertura',type:'material',description:'Painel solar genérico para coordenação BIM.',geometry:{width:1.1,depth:1.8,height:.05},material:generic('Painel solar','Equipamento'),tags:['solar','fotovoltaico','cobertura']},
]

export function addLibraryItemToModel(model:SmartStructBIMModel,item:BIMLibraryItem):SmartStructBIMModel{
 const n=model.elements.length+1
 const col=n%6,row=Math.floor(n/6)
 const base={x:col*2.2,y:row*2.2,z:0}
 const geometry={...item.geometry,...base}
 if(item.type==='isolated_footing'||item.type==='strip_footing'||item.type==='raft_foundation') geometry.z=-Number(item.geometry.height||.5)
 const el:BIMElement={id:`LIB-${item.id.toUpperCase()}-${n}`,name:item.name,discipline:item.category==='Geotecnia'?'geotechnics':item.category==='Equipamentos sanitários'?'hydraulics':'structures',type:item.type,level:item.category.includes('Fund')?'Fundação':'Piso 1',material:item.material,geometry,properties:{libraryId:item.id,libraryCategory:item.category,source:'Biblioteca BIM SmartStruct'},calculation:{module:'Biblioteca BIM',status:'check',results:{nota:'Elemento inserido a partir da biblioteca; verificar/dimensionar no módulo técnico aplicável.'}}}
 return {...model,elements:[...model.elements,el],updatedAt:new Date().toISOString()}
}

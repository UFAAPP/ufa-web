import { SelectView, DistrictGroup } from './lawsuit-model';

export const COURTLIST: SelectView[] = [
  { label: 'Infância', value: 'IN' },
  { label: 'Fazenda', value: 'FA' },
  { label: 'Civel', value: 'CI' },
  { label: 'Familia', value: 'FM' },
  { label: 'Criminal', value: 'CR' },
  { label: 'Especial Criminal', value: 'ER' },
  { label: 'Direito auxiliares', value: 'AU' },
  { label: 'Especial Cível', value: 'EC' },
  { label: 'Única', value: 'UN' },
];

export const LAWSUITSTATUS: SelectView[] = [
  { label: 'Em andamento', value: 'PROGRESS' },
  { label: 'Arquivado', value: 'ARCHIVED' },
];
export const LAWSUITTYPES =[
  'EXTRAJUDICIAL',
  'JUDICIAL',
]

export const DISTRICTGROUPS: DistrictGroup[] = [
  {
    state: 'Santa Catarina',
    districts: [
      'Capital, São José, Palhoça e Biguaçu',
      'Araranguá, Sombrio e Turvo',
      'Blumenau e Gaspar',
      'Chapecó e Xaxim',
      'Criciúma e Içara',
      'Itajaí, Balneário Camboriú, Camboriú e Navegantes',
      'Jaraguá do Sul e Guaramirim',
      'Joinville e São Francisco do Sul',
      'Laguna, Imbituba e Imaruí',
      'Orleans e Urussanga',
      'Balneário Piçarras e Barra Velha',
      'Tubarão e Braço do Norte',
      'Xanxerê e Xaxim',
      'Timbó, Indaial, Pomerode e Ascurra',
      'Rio do Sul e Ituporanga',
      'Rio do Sul e Trombudo Central',
      'Orleans e Braço do Norte',
      'Joinville, Garuva, Itapoá e Araquari',
      'Ibirama e Presidente Getúlio',
    ],
  },
];

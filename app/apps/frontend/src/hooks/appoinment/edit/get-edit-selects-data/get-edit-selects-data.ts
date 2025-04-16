import { useContext } from 'react';
import { SelectData } from '../../create/get-create-selects-data/get-create-selects-data';
import { NeighborhoodsContext } from '../../../../contexts/neighborhoods-context';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UseGetEditSelectsData {
  sex: SelectData[];
  specie: SelectData[];
  size: SelectData[];
  neighborhood: SelectData[];
  status: SelectData[];
  reason: SelectData[];
}

export function useGetEditSelectsData(): UseGetEditSelectsData {
  const neighborhoods = useContext(NeighborhoodsContext) as string[];

  const neighborhoodsData: SelectData[] = neighborhoods.map((neig) => ({
    value: neig,
    text: neig,
  }));

  return {
    sex: [
      { value: '', text: 'Seleccione Sexo', disabled: true },
      { value: 'Macho', text: 'Macho' },
      { value: 'Hembra', text: 'Hembra' },
    ],
    specie: [
      { value: '', text: 'Seleccione Especie', disabled: true },
      { value: 'Canino', text: 'Canino' },
      { value: 'Felino', text: 'Felino' },
    ],
    size: [
      { value: '', text: 'Seleccione Tamaño', disabled: true },
      { value: 'Grande', text: 'Grande' },
      { value: 'Mediano', text: 'Mediano' },
      { value: 'Pequeño', text: 'Pequeño' },
    ],
    neighborhood: [
      { value: '', text: 'Seleccione un barrio', disabled: true },
      ...neighborhoodsData,
    ],
    status: [
      {value: "Pendiente", text: "Pendiente"},
      {value: "Cancelado", text: "Cancelado"},
    ],
    reason: [
      { value: '', text: 'Seleccione un motivo', disabled: true },
      // General reasons
      { value: 'Enfermedad del dueño', text: 'Enfermedad del dueño' },
      { value: 'Problemas de transporte', text: 'Problemas de transporte' },
      { value: 'Emergencia familiar', text: 'Emergencia familiar' },
      // Female-specific reasons
      { value: 'En celo', text: 'En celo (Solo hembras)'  },
      { value: 'Preñada', text: 'Preñada (Solo hembras)'  },
      { value: 'Post parto', text: 'Post parto (Solo hembras)'  },
      { value: 'Agresividad', text: 'Agresividad'  },
      { value: 'Marcaje territorial', text: 'Marcaje territorial' },
      { value: 'Otro', text: 'Otro' },	
    ]
  };
}

export default useGetEditSelectsData;

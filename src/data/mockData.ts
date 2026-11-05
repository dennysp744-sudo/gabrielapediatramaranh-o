import { Article, PuericulturaMilestone, VaccineItem, FaqItem } from '../types';

export const CLINIC_INFO = {
  doctorName: 'Dra. Gabriela Lara',
  specialties: 'Pediatra e Neonatologista',
  crm: 'CRM MA 7773',
  rqe: 'RQE 5632 / 6808',
  clinicName: 'MedClinic São Lucas',
  address: 'Av. Desembargador Tácito de Caldas, nº 142 - 1º andar, Centro',
  city: 'Açailândia - MA',
  postalCode: '65930-000',
  phoneDisplay: '(99) 99209-9826',
  phoneRaw: '5599992099826',
  googleMapsUrl: 'https://share.google/Nq5WHGLfnuOY9W4P7',
  instagramUrl: 'https://www.instagram.com/ped.gabrielalara?xtok=OGlxYTBlY2hobTht',
  instagramHandle: '@ped.gabrielalara',
  hours: 'Segunda a Sexta: 08h às 12h e 14h às 18h | Sábados: plantão agendado',
  profilePhoto: '/assets/aistudio/Screenshot_20261105_185827_Instagram_b94b717a.jpg',
};

export const APPOINTMENT_TYPES = [
  {
    id: 'puericultura',
    title: 'Puericultura & Desenvolvimento',
    duration: '50-60 min',
    description: 'Acompanhamento do crescimento (peso e estatura), marcos do desenvolvimento neuropsicomotor, prevenção de doenças e acolhimento das dúvidas da rotina familiar.',
    recommendedFor: 'Bebês e crianças em todas as fases da infância',
    badge: 'Mais Frequente',
    color: 'border-purple-200 bg-purple-50/50 hover:border-purple-400'
  },
  {
    id: 'neonatologia',
    title: 'Primeira Consulta do Recém-Nascido',
    duration: '60 min',
    description: 'Consulta crucial nos primeiros 7 a 15 dias de vida. Avaliação da icterícia, teste do pezinho, cicatrização do coto umbilical, pega e amamentação e acolhimento puerperal.',
    recommendedFor: 'Bebês de 0 a 28 dias e prematuros',
    badge: 'Essencial nos 15 dias',
    color: 'border-rose-200 bg-rose-50/50 hover:border-rose-400'
  },
  {
    id: 'pediatria-geral',
    title: 'Consulta Pediátrica Geral / Queixas',
    duration: '40-50 min',
    description: 'Avaliação diagnóstica e conduta para sintomas agudos (tosse, febre, resfriado, dores abdominais, alergias cutâneas, alterações intestinais).',
    recommendedFor: 'Crianças de qualquer idade com sintomas ou queixas clínicas',
    badge: 'Diagnóstico & Tratamento',
    color: 'border-teal-200 bg-teal-50/50 hover:border-teal-400'
  },
  {
    id: 'prenatal-pediatrico',
    title: 'Consulta Pré-Natal Pediátrica',
    duration: '50 min',
    description: 'Realizada no 3º trimestre de gestação para preparar a família para a chegada do bebê, desmistificar o pós-parto imediato, rotina na maternidade e amamentação.',
    recommendedFor: 'Gestantes a partir da 32ª semana',
    badge: 'Para Gestantes',
    color: 'border-amber-200 bg-amber-50/50 hover:border-amber-400'
  },
  {
    id: 'urgencia-leve',
    title: 'Encaixe de Urgência Leve',
    duration: '30-40 min',
    description: 'Horários reservados para quadros agudos repentinos de crianças já acompanhadas pela clínica, evitando esperas exaustivas em prontos-socorros.',
    recommendedFor: 'Febre súbita, vômitos, irritabilidade ou sintomas de início recente',
    badge: 'Atendimento Rápido',
    color: 'border-indigo-200 bg-indigo-50/50 hover:border-indigo-400'
  }
];

export const PUERICULTURA_MILESTONES: PuericulturaMilestone[] = [
  {
    stageId: 'rn',
    ageRange: '0 a 28 dias',
    title: 'O Período Neonatal (Recém-Nascido)',
    badge: 'Primeiros Cuidados',
    description: 'A fase de maior vulnerabilidade e adaptação do bebê ao mundo extrauterino, com foco na amamentação, sono seguro e prevenção de infecções.',
    developmentGoals: [
      'Fixa o olhar brevemente em rostos a 20-30 cm de distância',
      'Reflexos primitivos presentes (moro, sucção forte, preensão palmar)',
      'Reage a sons altos e à voz materna e paterna',
      'Movimentos de braços e pernas simétricos e flexão fisiológica'
    ],
    nutritionGuidelines: [
      'Aleitamento materno exclusivo e em livre demanda (sem horários rígidos)',
      'Não oferecer água, chás ou sucos nos primeiros 6 meses',
      'Caso necessite de fórmula infantil, seguir estritamente a prescrição pediátrica'
    ],
    sleepAndRoutine: [
      'Posição sempre supina (barriga para cima) em superfície firme e sem travesseiros ou protetores de berço',
      'O recém-nascido dorme de 14 a 17 horas por dia, com ciclos curtos de 2 a 4 horas',
      'Banho diário em água morna (36-37°C), sem correntes de ar'
    ],
    safetyAndHygiene: [
      'Higienização do coto umbilical com álcool 70% a cada troca de fralda até a queda',
      'Realização obrigatória da triagem neonatal: Teste do Pezinho (3º ao 5º dia), Olhinho, Ouvidinho e Coraçãozinho',
      'Vacinas BCG e Hepatite B administradas logo após o nascimento'
    ],
    frequentQuestions: [
      {
        question: 'É normal o coto umbilical sangrar um pouquinho ou cheirar forte?',
        answer: 'Pequenos pontinhos de sangue ao secar podem ser normais. Porém, vermelhidão na pele ao redor, inchaço ou secreção com odor fétido exigem avaliação médica imediata.'
      },
      {
        question: 'Por que o bebê parece ter soluço com tanta frequência?',
        answer: 'O diafragma do bebê ainda é imaturo. O soluço é benigno, não causa dor e passa sozinho sem necessidade de simpatias.'
      }
    ]
  },
  {
    stageId: '1-6m',
    ageRange: '1 a 6 meses',
    title: 'Lactente Jovem & Primeiras Conexões',
    badge: 'Sorrisos e Descobertas',
    description: 'Período marcado pelo despertar social, controle de cabeça, ganho expressivo de peso e fortalecimento do sistema imune com o calendário de vacinas.',
    developmentGoals: [
      '2 meses: Sorriso social em resposta a estímulos e sustentação da cabeça de bruços',
      '3 meses: Descobre as próprias mãos e as leva à boca; emite os primeiros gorgolejos',
      '4 meses: Rola de bruços para as costas; apoia-se nos antebraços no "tummy time"',
      '5-6 meses: Alcança brinquedos com as duas mãos e senta-se com apoio'
    ],
    nutritionGuidelines: [
      'Manutenção do aleitamento materno exclusivo até os 6 meses completos',
      'Suplementação profilática de Vitamina D iniciada na primeira semana e ferro conforme protocolo da SBP'
    ],
    sleepAndRoutine: [
      'Estabelecimento do ritmo circadiano (diferenciação entre dia e noite)',
      'Salto dos 4 meses: pode haver regressão temporária do sono pelo despertar sensorial'
    ],
    safetyAndHygiene: [
      'Estímulo diário de "Tummy Time" (barriga para baixo) sempre sob supervisão acordada',
      'Uso estrito de bebê conforto voltado para trás em qualquer deslocamento de automóvel'
    ],
    frequentQuestions: [
      {
        question: 'O bebê de 3 meses fica babando muito, já são os dentes?',
        answer: 'Geralmente não! As glândulas salivares começam a produzir mais saliva nessa fase e o reflexo de engolir ainda não acompanha, além de levarem a mão à boca para explorar.'
      }
    ]
  },
  {
    stageId: '6-12m',
    ageRange: '6 a 12 meses',
    title: 'Introdução Alimentar & Mobilidade',
    badge: 'Sabores e Primeiros Passos',
    description: 'A transição para a alimentação da família, início do sentar sem apoio, engatinhar e primeiras palavras com significado.',
    developmentGoals: [
      '6 meses: Senta sem apoio com boa sustentação de tronco (sinal de prontidão)',
      '8-9 meses: Movimento de pinça com os dedos, engatinha ou arrasta-se eficientemente',
      '10-12 meses: Dá os primeiros passos com apoio e compreende comandos simples ("dá tchau", "cadê a bola")'
    ],
    nutritionGuidelines: [
      'Início da Introdução Alimentar aos 6 meses (se presentes todos os sinais de prontidão)',
      'Oferta de comida de verdade: legumes, frutas in natura, proteínas bem cozidas e cereais',
      'Água filtrada oferecida nos intervalos das refeições',
      'PROIBIDO até 2 anos: açúcar, sucos artificiais, mel, alimentos ultraprocessados e sal em excesso'
    ],
    sleepAndRoutine: [
      'Dormem de 11 a 14 horas diárias, geralmente com 2 sonecas de dia (manhã e tarde)'
    ],
    safetyAndHygiene: [
      'Proteção de tomadas, quinas pontiagudas, escadas e retirada de objetos pequenos de alcance',
      'Início da escovação dental com pasta de dente infantil contendo flúor (1100 ppm) desde o 1º dente'
    ],
    frequentQuestions: [
      {
        question: 'Qual a diferença entre reflexo de GAG e engasgo real?',
        answer: 'O reflexo de GAG é um mecanismo de defesa: o bebê fica vermelho, faz ânsia, emite som e traz o alimento para frente. O engasgo verdadeiro é silencioso, com dificuldade para respirar e palidez/lábios roxos — exige manobra de desengasgo.'
      }
    ]
  },
  {
    stageId: '1-3y',
    ageRange: '1 a 3 anos',
    title: 'A Primeira Infância & Linguagem',
    badge: 'Autonomia e Exploração',
    description: 'Fase de expansão rápida do vocabulário, autonomia na locomoção, alimentação autônoma e os primeiros limites sociais.',
    developmentGoals: [
      'Anda com segurança, corre e sobe pequenos degraus',
      'Vocabulário ultrapassa dezenas de palavras e formação de frases simples ("quero água")',
      'Usa colher e bebe em copo aberto',
      'Fase do "não" e dos acessos de frustração (amadurecimento do córtex pré-frontal)'
    ],
    nutritionGuidelines: [
      'Alimentação integrada à da família de forma saudável e colorida',
      'Respeito aos sinais de saciedade da criança: nunca forçar a comer'
    ],
    sleepAndRoutine: [
      'Geralmente transiciona para 1 única soneca após o almoço',
      'Rotina previsível de sono noturno sem telas antes de dormir'
    ],
    safetyAndHygiene: [
      'Zero tempo de tela passiva até os 2 anos (SBP/OMS)',
      'Desfralde apenas quando a criança demonstrar sinais fisiológicos de prontidão (geralmente após os 2 anos)'
    ],
    frequentQuestions: [
      {
        question: 'Meu filho de 2 anos comia de tudo e de repente começou a recusar a comida. O que houve?',
        answer: 'A partir de 1 ano e meio o ritmo de crescimento desacelera fisiologicamente e ocorre a neofobia alimentar natural. Mantenha a calma, continue oferecendo sem pressionar nem substituir refeições por guloseimas ou mamadeiras.'
      }
    ]
  }
];

export const VACCINE_SCHEDULE: VaccineItem[] = [
  {
    id: 'vac-1',
    ageLabel: 'Ao Nascer',
    name: 'BCG + Hepatite B',
    diseaseTarget: 'Tuberculose grave (miliar e meníngea) e infecção pelo vírus da Hepatite B',
    notes: 'Dose única na maternidade. A marquinha da BCG surge entre 3 a 6 semanas.',
    isMandatorySUS: true,
    isSBPRecommended: true,
  },
  {
    id: 'vac-2',
    ageLabel: '2 Meses',
    name: 'Pentavalente + VIP + Pneumocócica 10v + Rotavírus',
    diseaseTarget: 'Difteria, Tétano, Coqueluche, Haemophilus influenzae B, Poliomielite, Meningites/Pneumonias por pneumococo e Diarreia por Rotavírus',
    notes: '1ª dose do esquema primário de imunização.',
    isMandatorySUS: true,
    isSBPRecommended: true,
  },
  {
    id: 'vac-3',
    ageLabel: '3 Meses',
    name: 'Meningocócica C (SUS) / Meningocócica ACWY (Clínica)',
    diseaseTarget: 'Meningite meningocócica',
    notes: 'A SBP orienta preferencialmente a proteção ampla com a vacina Men ACWY + Men B.',
    isMandatorySUS: true,
    isSBPRecommended: true,
  },
  {
    id: 'vac-4',
    ageLabel: '4 Meses',
    name: '2ª Dose: Pentavalente + VIP + Pneumo 10v + Rotavírus',
    diseaseTarget: 'Continuação da imunização básica do 1º semestre',
    notes: 'Crucial respeitar o intervalo mínimo de 60 dias da primeira dose.',
    isMandatorySUS: true,
    isSBPRecommended: true,
  },
  {
    id: 'vac-5',
    ageLabel: '5 Meses',
    name: '2ª Dose: Meningocócica C / ACWY',
    diseaseTarget: 'Meningites',
    notes: 'Reforço da proteção contra o meningococo.',
    isMandatorySUS: true,
    isSBPRecommended: true,
  },
  {
    id: 'vac-6',
    ageLabel: '6 Meses',
    name: '3ª Dose: Pentavalente + VIP + Influenza (Gripe)',
    diseaseTarget: 'Poliomielite, Coqueluche, Gripe sazonal',
    notes: 'A vacina da gripe passa a ser anual para crianças a partir dos 6 meses.',
    isMandatorySUS: true,
    isSBPRecommended: true,
  },
  {
    id: 'vac-7',
    ageLabel: '9 Meses',
    name: 'Febre Amarela (Dose Inicial)',
    diseaseTarget: 'Febre Amarela',
    notes: 'Indicada no calendário nacional e regiões endêmicas.',
    isMandatorySUS: true,
    isSBPRecommended: true,
  },
  {
    id: 'vac-8',
    ageLabel: '12 Meses (1 Ano)',
    name: 'Tríplice Viral + Pneumo 10v (Reforço) + Meningo C/ACWY (Reforço)',
    diseaseTarget: 'Sarampo, Caxumba, Rubéola e reforço bacteriano',
    notes: 'Momento de grande comemoração e proteção fundamental com a Tríplice Viral.',
    isMandatorySUS: true,
    isSBPRecommended: true,
  },
  {
    id: 'vac-9',
    ageLabel: '15 Meses',
    name: 'DTP (Tríplice bacteriana) + VOP/VIP + Hepatite A + Tetra Viral (ou Varicela)',
    diseaseTarget: 'Catapora (Varicela), Hepatite A, Reforço da Poliomielite e Coqueluche',
    notes: 'Primeiro grande ciclo de reforços da infância completado.',
    isMandatorySUS: true,
    isSBPRecommended: true,
  }
];

export const ARTICLES_DATABASE: Article[] = [
  {
    id: 'art-1',
    slug: 'introducao-alimentar-sem-traumas',
    title: 'Introdução Alimentar sem Traumas: BLW, Tradicional ou Participativo?',
    subtitle: 'Descubra como transformar a transição para a comida da família em um momento prazeroso, seguro e saudável.',
    category: 'alimentacao',
    readTimeMinutes: 6,
    publishedDate: '28 Out 2026',
    summary: 'Aos 6 meses, o bebê está pronto para explorar novos sabores e texturas. Entenda as diferenças entre as abordagens e por que o método participativo costuma ser o mais harmonioso.',
    tags: ['Alimentação', 'Bebê 6 meses', 'BLW', 'Puericultura'],
    content: {
      introduction: 'Chegar aos 6 meses de vida é um grande marco para a família: é hora de iniciar a introdução de alimentos sólidos. Mas com tantas informações nas redes sociais, muitos pais se sentem ansiosos entre escolher métodos rígidos. A verdade científica é que não existe um modelo único: o melhor método é aquele que respeita a prontidão do bebê e a paz da mesa familiar.',
      sections: [
        {
          heading: 'Quais são os verdadeiros Sinais de Prontidão?',
          paragraphs: [
            'Antes de colocar a primeira colher de comida na boca da criança, precisamos ter certeza de que o corpinho dela está maduro fisiologicamente e neurologicamente.',
            'Os sinais de prontidão fundamentais são:'
          ],
          bulletPoints: [
            'Sustentação firme da cabeça e do tronco (sentar com o mínimo ou nenhum apoio)',
            'Diminuição acentuada do reflexo de protrusão da língua (o bebê não empurra automaticamente tudo o que entra na boca para fora)',
            'Coordenação motora olho-mão-boca (levar objetos com intenção à boca)',
            'Interesse evidente pela comida dos adultos (acompanha os pratos com o olhar e tenta pegar).'
          ]
        },
        {
          heading: 'Entendendo os Métodos: Tradicional vs BLW vs Participativo',
          paragraphs: [
            'No método Tradicional, os alimentos são oferecidos na colher na consistência de papas amassadas com o garfo (nunca liquidificadas ou peneiradas).',
            'No BLW (Baby-Led Weaning), os alimentos são oferecidos em cortes seguros (formato de palitos ou rodelas macias) para que o próprio bebê pegue com a mão e leve à boca.',
            'O Método Participativo, amplamente defendido pela Sociedade Brasileira de Pediatria, combina o melhor dos dois mundos: os pais oferecem alguns alimentos na colher para garantir ingestão nutricional adequada, enquanto deixam outros pedaços macios disponíveis para a exploração sensorial autônoma do bebê.'
          ]
        },
        {
          heading: 'O que NUNCA oferecer antes dos 2 anos',
          paragraphs: [
            'Evite absolutamente:',
            '1. Açúcar e doces em qualquer forma (incluindo biscoitos, bolos recheados e achocolatados).',
            '2. Sucos de fruta (mesmo naturais integrais): a fruta deve ser comida inteira para preservar fibras e não sobrecarregar com frutose líquida.',
            '3. Mel (risco grave de botulismo infantil em menores de 1 ano).'
          ]
        }
      ],
      takeaways: [
        'Respeite o apetite e a saciedade da criança: comer é um aprendizado diário.',
        'A sujeira faz parte do desenvolvimento sensorial e motor saudável.',
        'Mantenha o aleitamento materno ou fórmula em paralelo: nos primeiros meses a comida é complementar.'
      ],
      warningNote: 'Em caso de engasgos frequentes, recusa total ou alterações na respiração durante a deglutição, procure acompanhamento imediato com a pediatra.'
    }
  },
  {
    id: 'art-2',
    slug: 'bronquiolite-e-virus-sincicial-respiratorio',
    title: 'Bronquiolite e VSR: Como Proteger seu Bebê das Doenças Respiratórias',
    subtitle: 'Entenda os sinais precoces de esforço respiratório e as medidas preventivas essenciais para os primeiros anos de vida.',
    category: 'doencas-comuns',
    readTimeMinutes: 5,
    publishedDate: '15 Out 2026',
    summary: 'O Vírus Sincicial Respiratório (VSR) é o principal causador de bronquiolite em recém-nascidos e lactentes. Saiba quando um simples resfriado exige avaliação imediata.',
    tags: ['Respiração', 'Bronquiolite', 'VSR', 'Recém-Nascido', 'Urgência'],
    content: {
      introduction: 'A bronquiolite viral aguda é a infecção do trato respiratório inferior mais comum em bebês no primeiro ano de vida. Provoca a inflamação dos bronquíolos (as ramificações mais finas do pulmão), levando a acúmulo de secreção e dificuldade para o ar passar.',
      sections: [
        {
          heading: 'Como a doença começa?',
          paragraphs: [
            'Nos primeiros 2 a 3 dias, a infecção parece um resfriado comum: coriza clara, espirros, febre baixa e tosse leve.',
            'Por volta do 3º ao 5º dia, o quadro pode se intensificar com tosse mais persistente, respiração acelerada (taquipneia) e chiado no peito.'
          ]
        },
        {
          heading: 'Sinais de Alerta: Quando correr para o atendimento médico?',
          paragraphs: [
            'Observe a respiração do seu bebê com o tórax despido. Fique alerta se notar:'
          ],
          bulletPoints: [
            'Afundamento da pele entre as costelas ou abaixo delas (tiragem intercostal ou subcostal)',
            'Batimento das asinhas do nariz ao respirar',
            'Bebê com dificuldade para mamar porque cansa ao sugar e precisa soltar o peito para respirar',
            'Gemência ao respirar ou sonolência excessiva',
            'Lábios arroxeados ou extremidades pálidas (emergência médica imediata).'
          ]
        },
        {
          heading: 'A importância da Higiene Nasal com Soro Fisiológico',
          paragraphs: [
            'A lavagem nasal com soro fisiológico a 0,9% é a intervenção não-medicamentosa mais eficaz para manter as vias aéreas superiores desobstruídas, permitindo que o bebê durma e mame com mais conforto.'
          ]
        }
      ],
      takeaways: [
        'Lave as mãos com frequência e evite visitas de pessoas resfriadas a recém-nascidos.',
        'Não fume em ambientes onde crianças convivem.',
        'Mantenha a vacinação em dia e procure a consulta com a pediatra aos primeiros sinais de desconforto respiratório.'
      ]
    }
  },
  {
    id: 'art-3',
    slug: 'o-salto-dos-4-meses-e-o-sono-do-bebe',
    title: 'O Salto dos 4 Meses e a Regressão do Sono: Entenda o que Acontece',
    subtitle: 'Por que aquele bebê que dormia horas seguidas começou a acordar a cada 40 minutos? A ciência por trás da maturação neurológica.',
    category: 'sono',
    readTimeMinutes: 7,
    publishedDate: '02 Out 2026',
    summary: 'A chamada "regressão do sono dos 4 meses" na verdade é uma grande progressão cerebral. Descubra como atravessar essa fase com carinho e sem desespero.',
    tags: ['Sono Infantil', 'Salto de Desenvolvimento', 'Rotina', 'Bebê 4 meses'],
    content: {
      introduction: 'Por volta do quarto mês de vida, é extremamente frequente ouvir no consultório: "Doutora, meu bebê dormia 5 ou 6 horas seguidas à noite e agora acorda a cada hora procurando o peito!". Essa mudança abrupta causa apreensão nos pais, mas é uma das maiores evidências de amadurecimento cerebral da infância.',
      sections: [
        {
          heading: 'A mudança na arquitetura do sono humano',
          paragraphs: [
            'Nos primeiros 3 meses de vida, o sono do recém-nascido tem apenas dois estágios básicos: sono ativo (semelhante ao REM) e sono quieto.',
            'Aos 4 meses, o cérebro amadurece e o bebê passa a ter a mesma arquitetura de sono do adulto, com 4 fases que se alternam em ciclos de 45 a 50 minutos. Ao final de cada ciclo, há um breve microdespertar. Se o bebê foi colocado no berço já profundamente adormecido no colo ou no peito, ele estranha ao acordar em um ambiente diferente e chora pedindo a mesma condição anterior para voltar a dormir.'
          ]
        },
        {
          heading: 'O despertar cognitivo e sensorial',
          paragraphs: [
            'Nessa mesma época, a visão do bebê atinge alcance tridimensional, ele reconhece cores vivas, escuta conversas distantes e percebe que é um indivíduo separado da mãe. O mundo se torna incrivelmente interessante, o que dificulta o relaxamento na hora de mamar e na hora de dormir.'
          ]
        },
        {
          heading: 'Como ajudar o bebê e a família a superar essa fase?',
          paragraphs: [
            'Estratégias comprovadas para acolher a fase:'
          ],
          bulletPoints: [
            'Fortaleça o ritual do sono noturno: banho relaxante, luzes suaves e ambiente silencioso cerca de 45 minutos antes de deitar',
            'Evite estímulos agitados, sons altos e telas perto do horário de dormir',
            'Ajude o bebê a fazer a transição para o berço ainda sonolento, mas acordado, para que reconheça seu cantinho de descanso',
            'Peça rede de apoio para revezar com você nos cuidados da madrugada.'
          ]
        }
      ],
      takeaways: [
        'A regressão dura em média de 2 a 4 semanas e é um sinal de saúde neurológica.',
        'Não mude radicalmente a rotina da casa nem introduza alimentos precocemente acreditando que a fórmula "fará o bebê dormir mais".',
        'Paciência, colo e acolhimento são os melhores remédios.'
      ]
    }
  },
  {
    id: 'art-4',
    slug: 'febre-em-criancas-amiga-ou-vilao',
    title: 'Febre em Crianças: Amiga da Imunidade ou Motivo de Desespero?',
    subtitle: 'Aprenda a reconhecer o estado geral da criança além do termômetro e como conduzir episódios febris com segurança.',
    category: 'doencas-comuns',
    readTimeMinutes: 6,
    publishedDate: '19 Set 2026',
    summary: 'A febre não é uma doença, e sim um mecanismo de defesa vital do corpo humano. Saiba quando monitorar em casa e quando procurar o atendimento presencial.',
    tags: ['Febre', 'Termômetro', 'Sintomas', 'Cuidados em Casa'],
    content: {
      introduction: 'Poucas coisas causam tanto pânico nas famílias quanto ver o termômetro marcar 38,5°C ou 39°C. Esse fenômeno, conhecido na medicina como "febrefobia", faz com que muitos pais mediquem a criança antes mesmo do tempo necessário ou corram desesperados para emergências sem avaliar o estado geral do pequeno.',
      sections: [
        {
          heading: 'O que a medicina considera febre?',
          paragraphs: [
            'A Sociedade Brasileira de Pediatria define febre como a temperatura axilar igual ou superior a 37,8°C.',
            'Entre 37,3°C e 37,7°C consideramos febrícula ou estado subfebril, que muitas vezes decorre de excesso de roupas, choro prolongado ou calor ambiente.'
          ]
        },
        {
          heading: 'O estado geral importa mais do que o número!',
          paragraphs: [
            'Mais importante do que o valor absoluto no termômetro é como a criança se comporta:',
            'Uma criança com 38,2°C que, mesmo febril, interage, bebe água, urina bem e sorri após o banho é muito menos preocupante do que uma criança com 37,9°C que está caída, apática, gemente ou sem forças para erguer a cabeça.'
          ]
        },
        {
          heading: 'Medidas seguras de conforto',
          bulletPoints: [
            'Ofereça líquidos com frequência (leite materno, água, água de coco)',
            'Não agasalhe demais a criança: roupas leves ajudam a dissipar o calor corporal',
            'Banho morno (nunca gelado e nunca com álcool, que é tóxico pela pele)',
            'Use apenas os antitérmicos receitados pela pediatra nas doses exatas para o peso atual da criança.'
          ]
        }
      ],
      takeaways: [
        'A febre ajuda os glóbulos brancos a combaterem vírus e bactérias.',
        'Recém-nascidos de até 3 meses com febre de 37,8°C devem ser avaliados com urgência.',
        'Febre persistente por mais de 72 horas sempre exige reavaliação pediátrica presencial.'
      ]
    }
  },
  {
    id: 'art-5',
    slug: 'colicas-no-recem-nascido-dicas-praticas',
    title: 'Cólicas no Recém-Nascido: O que a Ciência Diz e o que Realmente Ajuda',
    subtitle: 'Compreenda a imaturidade do trato gastrointestinal do bebê e técnicas de massagem e posicionamento para acalmar as crises.',
    category: 'neonatologia',
    readTimeMinutes: 5,
    publishedDate: '10 Set 2026',
    summary: 'A cólica do lactente surge por volta das 2 a 3 semanas de vida e atinge o pico às 6 semanas. Conheça as melhores condutas baseadas em evidências.',
    tags: ['Cólicas', 'Recém-Nascido', 'Massagens', 'Gases', 'Acalmar'],
    content: {
      introduction: 'O choro inconsolável do final da tarde, com perninhas flexionadas sobre a barriga e punhos cerrados, é a clássica manifestação da cólica do recém-nascido. Para os pais, ver o bebê sofrendo gera uma sensação de impotência, mas entender a causa traz serenidade para apoiar o bebê.',
      sections: [
        {
          heading: 'Por que ocorrem as cólicas?',
          paragraphs: [
            'O sistema digestivo do bebê ainda está aprendendo a coordenar a motilidade intestinal e a microbiota ainda está em colonização. Além disso, há uma sobrecarga de estímulos sensoriais acumulados ao longo do dia, o que faz com que o final da tarde seja o horário típico do choro.'
          ]
        },
        {
          heading: 'Condutas comprovadas que trazem alívio',
          bulletPoints: [
            'Contato pele a pele (o calor do peito do pai ou da mãe traz conforto e regulação térmica e cardíaca)',
            'Posição do "leãozinho no galho" (bebê apoiado de bruços no antebraço dos pais)',
            'Massagens abdominais no sentido horário ("I Love You") e movimentos suaves de bicicleta com as pernas',
            'Banho de ofurô / balde com água morna até os ombros',
            'Ruído branco suave e ambiente na penumbra para diminuir estímulos.'
          ]
        }
      ],
      takeaways: [
        'A cólica atinge o pico por volta da 6ª semana e desaparece espontaneamente por volta do 3º ao 4º mês.',
        'Evite dar chás ou medicamentos sem receita médica.',
        'Mãe que amamenta não precisa fazer dietas restritivas radicais por conta própria.'
      ]
    }
  },
  {
    id: 'art-6',
    slug: 'telas-na-infancia-orientacoes-sbp',
    title: 'Uso de Telas na Infância: Os Riscos do Excesso e as Diretrizes da SBP',
    subtitle: 'Por que a Sociedade Brasileira de Pediatria contraindica telas antes dos 2 anos e como proteger o desenvolvimento infantil.',
    category: 'desenvolvimento',
    readTimeMinutes: 6,
    publishedDate: '24 Ago 2026',
    summary: 'Smartphones e tablets se tornaram onipresentes, mas o cérebro em formação precisa do mundo real tridimensional. Saiba quais são os limites recomendados por idade.',
    tags: ['Telas', 'Desenvolvimento', 'Atraso de Fala', 'SBP', 'Infância'],
    content: {
      introduction: 'O uso precoce de telas digitais (celulares, tablets e televisão) está diretamente associado a atrasos na fala, distúrbios graves de sono, irritabilidade, miopia precoce e dificuldades de regulação emocional em crianças pequenas.',
      sections: [
        {
          heading: 'Recomendações Oficiais da Sociedade Brasileira de Pediatria',
          bulletPoints: [
            'Menores de 2 anos: ZERO tempo de telas passivas (evitar até televisão ligada como fundo)',
            '2 a 5 anos: Limite máximo de 1 hora por dia, sempre com conteúdo de alta qualidade e com mediação ativa dos pais',
            '6 a 10 anos: Limite de 1 a 2 horas por dia',
            'Adolescentes (11 a 18 anos): Máximo de 2 a 3 horas por dia e jamais utilizar telas 2 horas antes de dormir.'
          ]
        },
        {
          heading: 'Por que o cérebro do bebê precisa do mundo real?',
          paragraphs: [
            'O cérebro da criança pequena aprende através da experiência multissensorial: tocando a textura da grama, sentindo o peso dos blocos de madeira, ouvindo a entonação da voz humana ao vivo e lendo as expressões faciais dos pais. As imagens hiperestimulantes em 2D das telas sobrecarregam os circuitos de dopamina e limitam o desenvolvimento da atenção sustentada.'
          ]
        }
      ],
      takeaways: [
        'Troque telas por brincadeiras livres, livros ilustrados e passeios ao ar livre.',
        'Os pais são o maior espelho: modere também o uso do próprio celular na presença dos filhos.',
        'Se notar atraso no início da fala ou ausência de contato visual, converse com a pediatra.'
      ]
    }
  }
];

export const FAQ_LIST: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'consultas',
    question: 'O que devo levar na primeira consulta do recém-nascido?',
    answer: 'Traga a Caderneta da Criança (entregue na maternidade), o resumo de alta hospitalar (com peso de nascimento, alta e tipo de parto), os testes de triagem já realizados (pezinho, coraçãozinho, orelhinha, olhinho), uma muda de roupa confortável e fraldas para a troca.'
  },
  {
    id: 'faq-2',
    category: 'convenio',
    question: 'A Dra. Gabriela Lara atende convênios ou emite recibo para reembolso?',
    answer: 'O atendimento é particular e humanizado, com tempo dedicado sem pressa. Emitimos nota fiscal detalhada e relatório médico completo para que você possa solicitar o reembolso integral ou parcial junto ao seu plano de saúde (Bradesco Saúde, SulAmérica, Unimed, Amil, Cassi, etc.).'
  },
  {
    id: 'faq-3',
    category: 'consultas',
    question: 'Com qual frequência devo levar meu filho na consulta de puericultura?',
    answer: 'Conforme a recomendação do Ministério da Saúde e da SBP: 1ª consulta aos 7-15 dias; consultas mensais até os 6 meses; consultas trimestrais dos 7 aos 12 meses; semestrais do 1º aos 2 anos; e a partir dos 2 anos, anuais ou conforme necessidade individual.'
  },
  {
    id: 'faq-4',
    category: 'urgencias',
    question: 'A Dra. atende urgências fora do horário de consultório?',
    answer: 'Para pacientes já em acompanhamento regular, oferecemos canal direto de suporte e orientação via WhatsApp para situações leves e triagem. Para emergências graves com risco de vida (dificuldade respiratória severa, convulsão, trauma grave), a orientação é se dirigir imediatamente ao pronto-socorro mais próximo.'
  },
  {
    id: 'faq-5',
    category: 'vacinas',
    question: 'As vacinas da rede pública (SUS) são suficientes ou devo fazer na rede privada?',
    answer: 'O Programa Nacional de Imunizações (PNI) do Brasil é um dos melhores do mundo e protege contra as principais doenças graves. No entanto, a rede particular oferece opções mais amplas como a Meningocócica ACWY, Meningocócica B e vacinas acelulares com menos reações adversas febris. Na consulta orientamos individualmente a melhor estratégia para o seu filho.'
  }
];

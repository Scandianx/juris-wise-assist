export type CaseStatus =
  | "Ativo"
  | "Em análise"
  | "Aguardando documento"
  | "Aguardando audiência"
  | "Suspenso"
  | "Encerrado";

export type Priority = "Alta" | "Média" | "Baixa";

export type DeadlineStatus =
  | "Pendente"
  | "Em andamento"
  | "Concluído"
  | "Vencido"
  | "Urgente";

export type DeadlineType =
  | "Manifestação"
  | "Contestação"
  | "Recurso"
  | "Audiência"
  | "Juntada de documento"
  | "Pagamento de guia"
  | "Prazo interno"
  | "Outro";

export type TaskStatus = "Pendente" | "Em andamento" | "Em revisão" | "Concluído";

export interface Case {
  id: string;
  name: string;
  client: string;
  processNumber: string;
  type: string;
  status: CaseStatus;
  responsible: string;
  nextDeadline: string;
  priority: Priority;
  documents: number;
  openTasks: number;
  lastUpdate: string;
  description: string;
  createdAt: string;
}

export interface Deadline {
  id: string;
  title: string;
  caseId: string;
  caseName: string;
  client: string;
  responsible: string;
  dueDate: string;
  type: DeadlineType;
  priority: Priority;
  status: DeadlineStatus;
  note?: string;
}

export interface Task {
  id: string;
  title: string;
  caseId: string;
  caseName: string;
  client: string;
  responsible: string;
  dueDate: string;
  priority: Priority;
  status: TaskStatus;
  description: string;
}

export interface DocumentItem {
  id: string;
  name: string;
  caseId: string;
  caseName: string;
  client: string;
  type:
    | "Procuração"
    | "Contrato"
    | "Comprovante"
    | "Documento pessoal"
    | "Petição"
    | "Decisão"
    | "Sentença"
    | "Outro";
  uploadedAt: string;
  uploadedBy: string;
  status: "Ativo" | "Arquivado";
}

export interface Petition {
  id: string;
  type: string;
  caseId: string;
  date: string;
  status: "Rascunho" | "Em revisão" | "Final";
  responsible: string;
}

export interface Insight {
  id: string;
  caseId?: string;
  message: string;
  level: "info" | "warning" | "danger";
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  type: "Administrador" | "Advogado" | "Assistente jurídico" | "Cliente";
  status: "Ativo" | "Inativo";
  lastAccess: string;
  permissions: string[];
}

export const cases: Case[] = [
  {
    id: "c-1001",
    name: "Ação de Cobrança — Almeida Comércio Ltda.",
    client: "Almeida Comércio Ltda.",
    processNumber: "1003456-21.2024.8.26.0100",
    type: "Cobrança",
    status: "Ativo",
    responsible: "Dra. Marina Azevedo",
    nextDeadline: "Em 2 dias",
    priority: "Alta",
    documents: 12,
    openTasks: 4,
    lastUpdate: "Há 3 horas",
    description:
      "Ação de cobrança referente a notas fiscais inadimplidas pela contraparte, com pedido de tutela de urgência para bloqueio de valores.",
    createdAt: "12/03/2025",
  },
  {
    id: "c-1002",
    name: "Reclamação Trabalhista — João Ferreira",
    client: "João Ferreira",
    processNumber: "1000987-65.2024.5.02.0011",
    type: "Trabalhista",
    status: "Aguardando audiência",
    responsible: "Dr. Rafael Monteiro",
    nextDeadline: "Em 6 dias",
    priority: "Média",
    documents: 9,
    openTasks: 2,
    lastUpdate: "Ontem",
    description:
      "Pleito de horas extras, adicional noturno e reflexos. Audiência una de instrução já designada.",
    createdAt: "02/02/2025",
  },
  {
    id: "c-1003",
    name: "Revisão Contratual — Grupo Horizonte",
    client: "Grupo Horizonte",
    processNumber: "Consultivo 2025/044",
    type: "Consultivo",
    status: "Em análise",
    responsible: "Ana Clara Souza",
    nextDeadline: "Em 12 dias",
    priority: "Baixa",
    documents: 18,
    openTasks: 5,
    lastUpdate: "Há 2 dias",
    description:
      "Revisão integral de minuta de fornecimento, com cláusulas de SLA, reajuste e LGPD.",
    createdAt: "20/01/2025",
  },
  {
    id: "c-1004",
    name: "Execução de Título Extrajudicial — Martins & Silva",
    client: "Martins & Silva Participações",
    processNumber: "1009876-12.2024.8.26.0224",
    type: "Execução",
    status: "Aguardando documento",
    responsible: "Dra. Marina Azevedo",
    nextDeadline: "Hoje",
    priority: "Alta",
    documents: 7,
    openTasks: 3,
    lastUpdate: "Há 1 hora",
    description:
      "Execução de cédula de crédito bancário com penhora online já deferida.",
    createdAt: "05/04/2025",
  },
  {
    id: "c-1005",
    name: "Ação Indenizatória — Carolina Mendes",
    client: "Carolina Mendes",
    processNumber: "1002211-09.2025.8.26.0100",
    type: "Cível",
    status: "Ativo",
    responsible: "Felipe Andrade",
    nextDeadline: "Em 4 dias",
    priority: "Média",
    documents: 14,
    openTasks: 6,
    lastUpdate: "Há 5 horas",
    description:
      "Indenização por danos morais e materiais decorrentes de falha na prestação de serviço.",
    createdAt: "18/03/2025",
  },
  {
    id: "c-1006",
    name: "Mandado de Segurança — Construtora Vale Norte",
    client: "Construtora Vale Norte",
    processNumber: "5001234-78.2025.4.03.6100",
    type: "Tributário",
    status: "Suspenso",
    responsible: "Dr. Rafael Monteiro",
    nextDeadline: "—",
    priority: "Baixa",
    documents: 21,
    openTasks: 1,
    lastUpdate: "Há 8 dias",
    description:
      "Discussão sobre exclusão do ICMS da base de cálculo de PIS e COFINS para o ano-calendário em curso.",
    createdAt: "10/12/2024",
  },
];

export const deadlines: Deadline[] = [
  {
    id: "d-01",
    title: "Manifestação sobre laudo pericial",
    caseId: "c-1004",
    caseName: "Execução de Título Extrajudicial — Martins & Silva",
    client: "Martins & Silva Participações",
    responsible: "Dra. Marina Azevedo",
    dueDate: "Hoje",
    type: "Manifestação",
    priority: "Alta",
    status: "Urgente",
    note: "Laudo apresentado pela parte adversa contém inconsistências.",
  },
  {
    id: "d-02",
    title: "Contestação à petição inicial",
    caseId: "c-1001",
    caseName: "Ação de Cobrança — Almeida Comércio Ltda.",
    client: "Almeida Comércio Ltda.",
    responsible: "Dra. Marina Azevedo",
    dueDate: "Em 2 dias",
    type: "Contestação",
    priority: "Alta",
    status: "Pendente",
  },
  {
    id: "d-03",
    title: "Juntada de procuração atualizada",
    caseId: "c-1005",
    caseName: "Ação Indenizatória — Carolina Mendes",
    client: "Carolina Mendes",
    responsible: "Felipe Andrade",
    dueDate: "Em 4 dias",
    type: "Juntada de documento",
    priority: "Média",
    status: "Em andamento",
  },
  {
    id: "d-04",
    title: "Audiência una de instrução",
    caseId: "c-1002",
    caseName: "Reclamação Trabalhista — João Ferreira",
    client: "João Ferreira",
    responsible: "Dr. Rafael Monteiro",
    dueDate: "Em 6 dias",
    type: "Audiência",
    priority: "Média",
    status: "Pendente",
  },
  {
    id: "d-05",
    title: "Pagamento de custas iniciais",
    caseId: "c-1003",
    caseName: "Revisão Contratual — Grupo Horizonte",
    client: "Grupo Horizonte",
    responsible: "Ana Clara Souza",
    dueDate: "Em 12 dias",
    type: "Pagamento de guia",
    priority: "Baixa",
    status: "Pendente",
  },
  {
    id: "d-06",
    title: "Recurso ordinário — interposição",
    caseId: "c-1002",
    caseName: "Reclamação Trabalhista — João Ferreira",
    client: "João Ferreira",
    responsible: "Dr. Rafael Monteiro",
    dueDate: "Há 3 dias",
    type: "Recurso",
    priority: "Alta",
    status: "Vencido",
  },
];

export const tasks: Task[] = [
  {
    id: "t-01",
    title: "Reunir documentos do cliente para contestação",
    caseId: "c-1001",
    caseName: "Ação de Cobrança — Almeida Comércio Ltda.",
    client: "Almeida Comércio Ltda.",
    responsible: "Ana Clara Souza",
    dueDate: "Em 1 dia",
    priority: "Alta",
    status: "Em andamento",
    description: "Solicitar planilhas, contratos e comprovantes de entrega.",
  },
  {
    id: "t-02",
    title: "Revisar minuta de petição inicial",
    caseId: "c-1005",
    caseName: "Ação Indenizatória — Carolina Mendes",
    client: "Carolina Mendes",
    responsible: "Felipe Andrade",
    dueDate: "Em 2 dias",
    priority: "Média",
    status: "Em revisão",
    description: "Validar pedidos e fundamentos antes do protocolo.",
  },
  {
    id: "t-03",
    title: "Agendar reunião com cliente",
    caseId: "c-1003",
    caseName: "Revisão Contratual — Grupo Horizonte",
    client: "Grupo Horizonte",
    responsible: "Ana Clara Souza",
    dueDate: "Em 5 dias",
    priority: "Baixa",
    status: "Pendente",
    description: "Alinhar pontos sensíveis da minuta antes da próxima rodada.",
  },
  {
    id: "t-04",
    title: "Protocolar petição de juntada",
    caseId: "c-1004",
    caseName: "Execução de Título Extrajudicial — Martins & Silva",
    client: "Martins & Silva Participações",
    responsible: "Dra. Marina Azevedo",
    dueDate: "Hoje",
    priority: "Alta",
    status: "Pendente",
    description: "Anexar comprovantes de notificação extrajudicial.",
  },
  {
    id: "t-05",
    title: "Conferir cálculo trabalhista",
    caseId: "c-1002",
    caseName: "Reclamação Trabalhista — João Ferreira",
    client: "João Ferreira",
    responsible: "Felipe Andrade",
    dueDate: "Em 3 dias",
    priority: "Média",
    status: "Pendente",
    description: "Validar verbas rescisórias e reflexos antes da audiência.",
  },
  {
    id: "t-06",
    title: "Elaborar parecer jurídico",
    caseId: "c-1006",
    caseName: "Mandado de Segurança — Construtora Vale Norte",
    client: "Construtora Vale Norte",
    responsible: "Dr. Rafael Monteiro",
    dueDate: "Concluída",
    priority: "Baixa",
    status: "Concluído",
    description: "Análise de viabilidade da tese tributária.",
  },
];

export const documents: DocumentItem[] = [
  {
    id: "doc-01",
    name: "Contrato de Prestação de Serviços — Almeida.pdf",
    caseId: "c-1001",
    caseName: "Ação de Cobrança — Almeida Comércio Ltda.",
    client: "Almeida Comércio Ltda.",
    type: "Contrato",
    uploadedAt: "10/05/2025",
    uploadedBy: "Ana Clara Souza",
    status: "Ativo",
  },
  {
    id: "doc-02",
    name: "Procuração — Carolina Mendes.pdf",
    caseId: "c-1005",
    caseName: "Ação Indenizatória — Carolina Mendes",
    client: "Carolina Mendes",
    type: "Procuração",
    uploadedAt: "08/05/2025",
    uploadedBy: "Felipe Andrade",
    status: "Ativo",
  },
  {
    id: "doc-03",
    name: "Decisão interlocutória — bloqueio.pdf",
    caseId: "c-1004",
    caseName: "Execução de Título Extrajudicial — Martins & Silva",
    client: "Martins & Silva Participações",
    type: "Decisão",
    uploadedAt: "05/05/2025",
    uploadedBy: "Dra. Marina Azevedo",
    status: "Ativo",
  },
  {
    id: "doc-04",
    name: "Comprovante de pagamento — custas.pdf",
    caseId: "c-1003",
    caseName: "Revisão Contratual — Grupo Horizonte",
    client: "Grupo Horizonte",
    type: "Comprovante",
    uploadedAt: "01/05/2025",
    uploadedBy: "Ana Clara Souza",
    status: "Ativo",
  },
  {
    id: "doc-05",
    name: "Petição inicial — Carolina Mendes.docx",
    caseId: "c-1005",
    caseName: "Ação Indenizatória — Carolina Mendes",
    client: "Carolina Mendes",
    type: "Petição",
    uploadedAt: "28/04/2025",
    uploadedBy: "Felipe Andrade",
    status: "Ativo",
  },
];

export const petitions: Petition[] = [
  {
    id: "p-01",
    type: "Contestação",
    caseId: "c-1001",
    date: "12/05/2025",
    status: "Em revisão",
    responsible: "Dra. Marina Azevedo",
  },
  {
    id: "p-02",
    type: "Petição inicial",
    caseId: "c-1005",
    date: "28/04/2025",
    status: "Final",
    responsible: "Felipe Andrade",
  },
  {
    id: "p-03",
    type: "Manifestação",
    caseId: "c-1004",
    date: "14/05/2025",
    status: "Rascunho",
    responsible: "Dra. Marina Azevedo",
  },
];

export const insights: Insight[] = [
  {
    id: "i-01",
    caseId: "c-1004",
    message: "Existe um prazo crítico em 2 dias neste caso.",
    level: "danger",
  },
  {
    id: "i-02",
    caseId: "c-1006",
    message: "Este caso está sem movimentação há 18 dias.",
    level: "warning",
  },
  {
    id: "i-03",
    caseId: "c-1001",
    message:
      "A petição inicial pode ser fortalecida com documentos complementares.",
    level: "info",
  },
  {
    id: "i-04",
    caseId: "c-1005",
    message:
      "Há tarefas pendentes vinculadas ao próximo prazo processual.",
    level: "warning",
  },
  {
    id: "i-05",
    caseId: "c-1002",
    message:
      "A IA recomenda revisar os fundamentos antes da próxima manifestação.",
    level: "info",
  },
];

export const users: User[] = [
  {
    id: "u-01",
    name: "Dra. Marina Azevedo",
    email: "marina@vneadvogados.com.br",
    role: "Sócia",
    type: "Administrador",
    status: "Ativo",
    lastAccess: "Há 2 horas",
    permissions: ["Gerenciar usuários", "Editar casos", "Aprovar petições"],
  },
  {
    id: "u-02",
    name: "Dr. Rafael Monteiro",
    email: "rafael@vneadvogados.com.br",
    role: "Sócio",
    type: "Advogado",
    status: "Ativo",
    lastAccess: "Ontem",
    permissions: ["Criar casos", "Criar petições", "Gerenciar prazos"],
  },
  {
    id: "u-03",
    name: "Ana Clara Souza",
    email: "ana@vneadvogados.com.br",
    role: "Assistente",
    type: "Assistente jurídico",
    status: "Ativo",
    lastAccess: "Há 30 min",
    permissions: ["Visualizar documentos", "Gerenciar prazos"],
  },
  {
    id: "u-04",
    name: "Felipe Andrade",
    email: "felipe@vneadvogados.com.br",
    role: "Advogado pleno",
    type: "Advogado",
    status: "Ativo",
    lastAccess: "Há 4 horas",
    permissions: ["Criar casos", "Criar petições"],
  },
  {
    id: "u-05",
    name: "Carolina Mendes",
    email: "carolina@cliente.com",
    role: "Cliente",
    type: "Cliente",
    status: "Inativo",
    lastAccess: "Há 12 dias",
    permissions: ["Visualizar documentos"],
  },
];

export const findCase = (id: string) => cases.find((c) => c.id === id);
export const deadlinesForCase = (id: string) =>
  deadlines.filter((d) => d.caseId === id);
export const tasksForCase = (id: string) => tasks.filter((t) => t.caseId === id);
export const documentsForCase = (id: string) =>
  documents.filter((d) => d.caseId === id);
export const petitionsForCase = (id: string) =>
  petitions.filter((p) => p.caseId === id);
export const insightsForCase = (id: string) =>
  insights.filter((i) => i.caseId === id);

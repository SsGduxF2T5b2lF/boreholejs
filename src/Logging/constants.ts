export const entityName = {
  point: 'POINT',
  interval: 'INTERVAL',
  geology: 'GEOLOGY',
  alterationMineral: 'ALTERATIONMINERAL',
};

const metalicMineralOption = ['', 10, 30, 50, 70, 100];

export const enumMetalicMineral = {
  FE: metalicMineralOption,
  MN: metalicMineralOption,
  PY: metalicMineralOption,
  AS: metalicMineralOption,
  CP: metalicMineralOption,
  GA: metalicMineralOption,
  SP: metalicMineralOption,
};

const alterationMineralOption = ['', 1, 2, 3];

export const enumAlterationMineral = {
  AD: alterationMineralOption,
  AR: alterationMineralOption,
  CA: alterationMineralOption,
  CH: alterationMineralOption,
  EP: alterationMineralOption,
  SE: alterationMineralOption,
  SIL: alterationMineralOption,
  SIAR: alterationMineralOption,
  SICH: alterationMineralOption,
};

const ALTERATIONS = ['', 'SIL', 'UN'];
const LITHOLOGIES = ['', 'DCT', 'SOL', 'VDA', 'VN'];
const OXIDES = ['', 'COX'];

export const enumGeology = {
  LITHOLOGIES,
  OXIDES,
  ALTERATIONS,
};

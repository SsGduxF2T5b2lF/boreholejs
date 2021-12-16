// LoggingProperties/* Constants Props
export interface ConstantsProps {
  [key: string]: (string | number)[];
}

// LoggingBase/Interval Props
export interface IntervalProps {
  z0?: number;
  z1?: number;
}

// LoggingBase/Point Props
export interface PointProps {
  at?: number;
}

// LoggingProperties/Geology Props
export interface GeologyProps {
  lithology?: number | string;
  oxide?: number | string;
  alteration?: number | string;
  comment?: number | string;
}

// LoggingProperties/AlterationMineral Props
export interface AlterationMineralProps {
  Sil?: number | string;
  SiAr?: number | string;
  SiCh?: number | string;
  Ar?: number | string;
  Ch?: number | string;
  Ca?: number | string;
  Ep?: number | string;
  Se?: number | string;
  Ad?: number | string;
}

// LoggingDump Props
export interface LoggingDumpProps
  extends IntervalProps,
    PointProps,
    GeologyProps,
    AlterationMineralProps {
  interval?: number | undefined;
}

// Borehole List Props
export interface BHListProps {
  name?: string;
}

// Borehole Props
export interface BoreholeProps {
  bhid?: string;
}

// Collar Props
export interface CollarProps {
  x?: number | undefined;
  y?: number | undefined;
  z?: number | undefined;
  azimuth?: number | undefined;
  dip?: number | undefined;
  totalDepth?: number | undefined;
}

// Create borehole props
export interface CreateBoreholeProps extends BoreholeProps, CollarProps {}

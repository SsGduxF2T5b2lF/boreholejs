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
  lithology?: string;
  oxide?: string;
  alteration?: string;
  comment?: string;
}

// LoggingDump Props
export interface LoggingDumpProps
  extends IntervalProps,
    PointProps,
    GeologyProps {
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

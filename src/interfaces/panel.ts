export type Unit = 'px' | 'rem' | '%';
export type SizeProp = `${string}${Unit}`;
export type Numeric = string | number;

export interface collapseStyle {
  opacity: Numeric;
  height: SizeProp;
  padding: Numeric;
}

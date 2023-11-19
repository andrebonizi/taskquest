export type Unit = 'px' | 'rem' | '%';
export type SizeProp = `${number}${Unit}`;

export interface collapseStyle {
  opacity: string | number;
  height: string;
  padding: string | number;
}

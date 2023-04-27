import { IOperatorData } from './IOperatorData';
import { IKeySharesKeys } from './IKeySharesKeys';

export interface IKeySharesData {
  publicKey?: string | null;
  operators?: IOperatorData[] | null;
  shares?: IKeySharesKeys | null;
  setData(data: any): any;
  validate(): void;
  get operatorIds(): number[];
  get operatorPublicKeys(): string[];

}

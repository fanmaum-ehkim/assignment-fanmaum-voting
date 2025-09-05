export class OffsetConnection<TNode = any> {
  getNodes: () => Promise<TNode[]>;
  getTotalCount: () => Promise<number>;
}

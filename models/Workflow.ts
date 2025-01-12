export type Status = "仮登録" | "承認待ち" | "承認済み" | "却下";

// ワークフローのモデル
interface WorkflowProps {
  id: number;
  name: string;
  description: string;
  status: Status;
}

export class Workflow {
  id;
  name;
  description;
  status;

  constructor(props: WorkflowProps) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.status = props.status;
  }
}

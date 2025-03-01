export type ExpenseType =
  | "Materiales"
  | "Social"
  | "Estadías"
  | "Necesidades"
  | "Alimentación"
  | "Otros";

export type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

export type DateType =
  `${digit}${digit}${digit}${digit}-${digit}${digit}-${digit}${digit}`;

export interface PublicUser {
  id: UUID;
  name: string;
  rut: string;
  tel: string;
  email: string;
  area: string;
  status: string;
}

export type FormActionFunction =
  | string
  | ((formData: FormData) => void | Promise<void>)
  | undefined;

export type ReportStatus = "Pending" | "Closed" | "Accepted";
export type UUIDv4 = `${string}-${string}-${string}-${string}`;

export interface ExpenseReport {
  id: UUIDv4;
  author_id: UUIDv4;
  name: string;
  type: ExpenseType;
  amount: number;
  created_at: DateType;
  status: ReportStatus;
  backup_url: string;
}

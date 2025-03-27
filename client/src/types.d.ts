export type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

export type UUID = `${string}-${string}-${string}-${string}-${string}`;

export type RUT =
  `${Optional<Digit>}${Digit}.${Digit}${Digit}${Digit}.${Digit}${Digit}${Digit}-${Digit | "K"}`;

export type ReportStatus = "Pending" | "Approved" | "Closed";

export type WorkerArea = "Otros" | "Ventas" | "Materiales" | "Procesos";

export type WorkerStatus = "Admin" | "Jefe De Area" | "Trabajador" | "Contador";

export type ExpenseType =
  | "Materiales"
  | "Social"
  | "Estadías"
  | "Necesidades"
  | "Alimentación"
  | "Otros";

export interface Report {
  id: UUID;
  status: ReportStatus;
  name: string;
  created_at: string;
  type: ExpenseType;
  amount: number;
}

export interface User {
  id: UUID;
  name: string;
  rut: RUT;
  password: string;
  status: WorkerStatus;
}

export type PublicUser = Omit<User, "password">;

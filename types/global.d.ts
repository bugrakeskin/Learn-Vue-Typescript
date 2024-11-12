export interface Tasks {
  id: Number;

  description: String;
  priority: "High" | "Medium" | "Low";
  done: Boolean;
}

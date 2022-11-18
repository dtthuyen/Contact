export interface Contact {
  id: string,
  avt?: any,
  firstname: string,
  lastname: string,
  phone: Array<string>,
  email: Array<string>,
  addr: Array<string>,
  birthday: string,
  company: string,
  value?: string,
  key?: string
  note: string
}

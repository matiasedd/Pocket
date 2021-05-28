export default interface Transaction {
  transactionId: string;
  userId: string;
  title: string;
  category: string;
  value: Number;
  type: 'income' | 'expense';
  description: string | null;
  isFixed: boolean;
  createdAt: string;
  updatedAt: string;
}

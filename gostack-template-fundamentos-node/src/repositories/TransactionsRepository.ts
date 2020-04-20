import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    this.transactions.forEach(bal => {
      if (bal.type === 'income') {
        balance.income += bal.value;
      } else {
        balance.outcome += bal.value;
      }
    });

    balance.total = balance.income - balance.outcome;

    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const balance = this.getBalance();
    const transaction = new Transaction({
      title,
      type,
      value,
    });

    if (transaction.type === 'outcome' && transaction.value > balance.total) {
      throw Error("You don't have money to do this");
    }

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;

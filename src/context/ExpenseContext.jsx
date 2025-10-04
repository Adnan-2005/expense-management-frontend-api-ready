import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../api";
import { useAuth } from "./AuthContext";

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await api.get('/expenses', {
        params: { userId: user.role === 'EMPLOYEE' ? user.id : undefined }
      });
      setExpenses(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createExpense = async (expense) => {
    try {
      const res = await api.post('/expenses', { ...expense, userId: user.id, status: 'Pending' });
      setExpenses([...expenses, res.data]);
    } catch (err) {
      console.error(err);
    }
  };

  const updateExpenseStatus = async (id, status) => {
    try {
      const res = await api.patch(`/expenses/${id}`, { status });
      setExpenses(expenses.map(exp => exp.id === id ? res.data : exp));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [user]);

  return (
    <ExpenseContext.Provider value={{ expenses, loading, fetchExpenses, createExpense, updateExpenseStatus }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => useContext(ExpenseContext);
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useExpenses } from "../context/ExpenseContext";

export default function Expenses() {
  const { user } = useAuth();
  const { expenses, loading, createExpense, updateExpenseStatus } = useExpenses();

  const [form, setForm] = useState({ amount: '', category: '', description: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    createExpense(form);
    setForm({ amount: '', category: '', description: '' });
  };

  if (loading) return <p className='p-6'>Loading...</p>;

  return (
    <div className="p-6">
      {user.role === 'EMPLOYEE' && (
        <>
          <h2 className="text-xl font-bold mb-4">Submit Expense</h2>
          <form onSubmit={handleSubmit} className="grid gap-3 max-w-md mb-6">
            <input type="number" placeholder="Amount" className="border p-2 rounded"
              value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} />
            <input type="text" placeholder="Category" className="border p-2 rounded"
              value={form.category} onChange={e => setForm({...form, category: e.target.value})} />
            <textarea placeholder="Description" className="border p-2 rounded"
              value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
            <button className="bg-green-600 text-white py-2 px-4 rounded">Submit</button>
          </form>
        </>
      )}

      <h2 className="text-xl font-bold mb-2">Expenses</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">User</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Category</th>
            <th className="p-2">Description</th>
            <th className="p-2">Status</th>
            {user.role === 'ADMIN' && <th className="p-2">Action</th>}
          </tr>
        </thead>
        <tbody>
          {expenses.map(exp => (
            <tr key={exp.id} className="border-t">
              <td className="p-2">{exp.userName || 'Employee'}</td>
              <td className="p-2">{exp.amount}</td>
              <td className="p-2">{exp.category}</td>
              <td className="p-2">{exp.description}</td>
              <td className="p-2">{exp.status}</td>
              {user.role === 'ADMIN' && (
                <td className="p-2 flex gap-2">
                  {exp.status === 'Pending' && (
                    <>
                      <button onClick={() => updateExpenseStatus(exp.id, 'Approved')} className="bg-green-600 text-white px-2 py-1 rounded">Approve</button>
                      <button onClick={() => updateExpenseStatus(exp.id, 'Rejected')} className="bg-red-600 text-white px-2 py-1 rounded">Reject</button>
                    </>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
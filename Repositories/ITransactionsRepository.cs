using System.Collections.Generic;
using System.Threading.Tasks;
using FinTracker.Models;

namespace FinTracker.Repositories
{
    public interface ITransactionsRepository
    {
        Task<IEnumerable<Transaction>> GetTransactionsByUsernameAsync(string username);
        Task<List<Transaction>> GetAllTransactionsAsync();
        Task<Transaction> GetTransactionByIdAsync(string id);
        Task AddTransactionAsync(Transaction transaction);
        Task UpdateTransactionAsync(string id, Transaction updatedTransaction);
        Task DeleteTransactionAsync(string id);
        Task<string> GetUsernameByTransactionIdAsync(string transactionId);
    }
}

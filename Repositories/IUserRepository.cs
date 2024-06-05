using FinTracker.Models;

namespace FinTracker.Repositories
{
    public interface IUsersRepository
    {
        Task<User> CreateAsync(User user);
        Task<User> GetByIdAsync(string id);
        Task<User> GetByUsernameAsync(string username);
        public Task<bool> CheckUserExists(string username, string password);
        Task<User> UpdateAsync(User user);
        Task DeleteAsync(User user);
        Task<bool> DeleteTransactionFromUserAsync(string username, string transactionId);
    }
}
